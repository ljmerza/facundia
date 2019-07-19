import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { LabelInterface } from './interfaces';
import { ClubhouseApiService } from '../api';

@Injectable()
export class LabelService {
	constructor(private readonly apiService: ClubhouseApiService) {}

	getLabels(): Observable<LabelInterface[]> {
		return this.apiService.getData('labels').pipe(map(response => response.data));
	}
}
