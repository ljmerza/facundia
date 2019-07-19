import { Controller, Get, Query } from '@nestjs/common';
import { ClientsService } from './service';
import { ClientInterface } from './interfaces';
import { Observable } from 'rxjs';

@Controller()
export class ClientsController {
    constructor(private readonly clientService: ClientsService) { }

    @Get('toggle/clients')
    getClients(@Query('authKey') authKey): Observable<ClientInterface[]> {
        return this.clientService.getClients(authKey);
    }
}
