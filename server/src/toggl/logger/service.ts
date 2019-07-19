import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { LoggerInterface } from './interfaces';
import { TogglApiService } from '../api';

@Injectable()
export class LoggerService {
	constructor(private readonly apiService: TogglApiService) {}

	getLogger(authKey): Observable<LoggerInterface[]> {
		return this.apiService.getData('me/Loggers', authKey).pipe(map(response => response.data));
	}
}
