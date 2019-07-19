import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ProjectInterface } from './interfaces';
import { TogglApiService } from '../api';

@Injectable()
export class ProjectsService {
	constructor(private readonly apiService: TogglApiService) {}

	getProjects(authKey): Observable<ProjectInterface[]> {
		return this.apiService.getData('me/projects', authKey).pipe(map(response => response.data));
	}
}
