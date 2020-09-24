import { Controller, Get, Headers } from '@nestjs/common';
import { ClientsService } from './service';
import { ClientInterface } from './interfaces';
import { Observable } from 'rxjs';

@Controller()
export class ClientsController {
	constructor(private readonly clientService: ClientsService) {}

	@Get('toggl/clients')
	getClients(@Headers('authorization') authKey: string): Observable<ClientInterface[]> {
		return this.clientService.getClients(authKey);
	}
}
