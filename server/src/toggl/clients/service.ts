import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ClientInterface } from './interfaces';
import { TogglApiService } from '../api';

@Injectable()
export class ClientsService {
	constructor(private readonly apiService: TogglApiService) {}

	getClients(authKey: string): Observable<ClientInterface[]> {
		return this.apiService.getData('me/clients', authKey).pipe(map(response => response.data));
	}
}
