import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ProjectInterface } from './interfaces';
import { TogglApiService } from '../api';

@Injectable()
export class ProjectsService {
	constructor(private readonly apiService: TogglApiService) {}

	getProjects(authKey: string): Observable<ProjectInterface[]> {
		return this.apiService.getData('me?with_related_data=true', authKey).pipe(map(response => response.data.data.projects));
	}
}
