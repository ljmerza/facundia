import { Controller, Get, Headers } from '@nestjs/common';
import { ProjectsService } from './service';
import { ProjectInterface } from './interfaces';
import { Observable } from 'rxjs';

@Controller()
export class ProjectsController {
	constructor(private readonly projectService: ProjectsService) {}

	@Get('toggl/projects')
	getProjects(@Headers('authorization') authKey: string): Observable<ProjectInterface[]> {
		return this.projectService.getProjects(authKey);
	}
}
