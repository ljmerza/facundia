import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ProjectInterface } from './interface';
import { StoryInterface } from '../stories';
import { ClubhouseApiService } from '../api';

@Injectable()
export class ProjectService {
    constructor(private readonly apiService: ClubhouseApiService) { }

    getProjects(): Observable<ProjectInterface[]> {
        return this.apiService.getData('projects')
            .pipe(map(response => response.data));
    }

    getProject(projectId): Observable<ProjectInterface> {
        return this.apiService.getData(`projects/${projectId}`)
            .pipe(map(response => response.data));
    }

    getProjectStories(projectId): Observable<StoryInterface[]> {
        return this.apiService.getData(`projects/${projectId}/stories`)
            .pipe(map(response => response.data));
    }
}
