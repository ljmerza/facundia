import { Controller, Get, Query } from '@nestjs/common';
import { ProjectsService } from './service';
import { ProjectInterface } from './interfaces';
import { Observable } from 'rxjs';

@Controller()
export class ProjectsController {
    constructor(private readonly projectservice: ProjectsService) { }

    @Get('toggle/projects')
    getProjects(@Query('authKey') authKey: string): Observable<ProjectInterface[]> {
        return this.projectservice.getProjects(authKey);
    }
}
