import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { LoggerInterface, LogTimeBodyInterface } from './interfaces';
import { TogglApiService } from '../api';

@Injectable()
export class LoggerService {
	constructor(private readonly apiService: TogglApiService) {}

	setLog(authKey: string, body: LogTimeBodyInterface): Observable<LoggerInterface[]> {
		return this.apiService.postData('time_entries', authKey, body).pipe(map(response => response.data));
	}
}
