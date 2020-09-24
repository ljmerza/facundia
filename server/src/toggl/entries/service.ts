import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { EntriesInterface } from './interfaces';
import { TogglApiService } from '../api';

@Injectable()
export class EntriesService {
	constructor(private readonly apiService: TogglApiService) {}

	getEntries(authKey: string): Observable<EntriesInterface[]> {
		return this.apiService.getData('me?with_related_data=true', authKey).pipe(map(response => response.data.data.time_entries));
	}
}
