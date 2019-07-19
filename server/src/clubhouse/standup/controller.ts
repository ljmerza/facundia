import { Controller, Get, Param, Query } from '@nestjs/common';
import { StandUpInterface, StandUpOrganizedProject } from './interface';
import { Observable, zip, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { ProfileService, MemberInterface } from '../profile';
import { ProjectService, ProjectInterface } from '../projects';
import { WorkflowService, WorkflowStateInterface } from '../workflow';
import { LabelService, LabelInterface } from '../label';

import { constants } from '../constants';

@Controller()
export class StandUpController {
	constructor(
		private readonly profileService: ProfileService,
		private readonly projectService: ProjectService,
		private readonly workflowService: WorkflowService,
		private readonly labelService: LabelService,
	) {}

	@Get('standup/:username')
	getStandUps(@Param('username') username): Observable<StandUpInterface> {
		return zip(
			this.profileService.getProfiles(),
			this.labelService.getLabels(),
			this.projectService.getProjects(),
			this.workflowService.getWorkflows()
		).pipe(
			switchMap(data => {
				const [profiles, labels, projects, workflows] = data;
				const [workflow] = workflows;

				const myProfile: MemberInterface = profiles.find(profile => profile.profile.mention_name === username);
				if (!myProfile) return of({ status: false, data: `Profile ${username} not found.` });

				const projectIds = projects.map(project => project.id);
				return zip(...projectIds.map(projectId => this.projectService.getProjectStories(projectId))).pipe(
					map((allStories: any) => {

						// organize all projects
						const organizedProjects = projectIds.map((id, stories) => {

                            // find names for these ids
							const projectStories = allStories[stories].map(story => {
								const project: ProjectInterface = projects.find(project => project.id === story.project_id);
								const state: WorkflowStateInterface = workflow.states.find(state => state.id === story.workflow_state_id);

                                story.labels = story.labels.map(storyLabel => {
                                    const matchingLabel: LabelInterface = labels.find(label => label.id === storyLabel.id);
                                    storyLabel.name = matchingLabel.name;
                                    return storyLabel;
                                });

								story.projectName = project.name;
								story.workflowName = state.name;
								return story;
							});

                            // group stories together by type needed
							const myStories = projectStories.filter(story => story.owner_ids.includes(myProfile.id));
							const myStoriesInDev = myStories.filter(story => story.workflow_state_id === constants.workflows.inDevId);
							const myStoriesInReview = myStories.filter(story => story.workflow_state_id === constants.workflows.inReviewId);
							const myStoriesDeployed = myStories.filter(story => story.workflow_state_id === constants.workflows.deployedId);
							const readyForDev = projectStories.filter(story => story.workflow_state_id === constants.workflows.readyForDevId);

							return {
								myStories,
								readyForDev,
								myStoriesInDev,
								myStoriesInReview,
								myStoriesDeployed,
							};
						});

						const organizedProject: StandUpOrganizedProject = {
							myStories: [],
							readyForDev: [],
							myStoriesInDev: [],
							myStoriesInReview: [],
							myStoriesDeployed: [],
						};

						// merge all organized projects
						const mergedProjects = organizedProjects.reduce((acc: StandUpOrganizedProject, project: StandUpOrganizedProject) => {
							acc.myStories.push(...project.myStories);
							acc.readyForDev.push(...project.readyForDev);
							acc.myStoriesInDev.push(...project.myStoriesInDev);
							acc.myStoriesInReview.push(...project.myStoriesInReview);
							acc.myStoriesDeployed.push(...project.myStoriesDeployed);
							return acc;
						}, organizedProject);

						return {
							myProfile,
							mergedProjects,
						};
					})
				);
			})
		);
	}
}
