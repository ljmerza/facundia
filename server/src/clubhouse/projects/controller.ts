import { Controller, Get, Param } from '@nestjs/common';
import { ProjectService } from './service';
import { ProjectInterface } from './interface';
import { StoryInterface } from '../stories/interface';
import { Observable } from 'rxjs';

@Controller()
export class ProjectController {
    constructor(private readonly projectService: ProjectService) { }

    @Get('projects')
    getProjects(): Observable<ProjectInterface[]> {
        return this.projectService.getProjects();
    }

    @Get('projects/:projectId')
    getProject(@Param('projectId') projectId): Observable<ProjectInterface> {
        return this.projectService.getProject(projectId);
    }

    @Get('projects/:projectId/stories')
    getProjectStories(@Param('projectId') projectId): Observable<StoryInterface[]> {
        return this.projectService.getProjectStories(projectId);
    }
}
