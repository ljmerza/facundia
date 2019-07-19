import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ClientsService {
    constructor(private httpClient: HttpClient) { }

    getClients(): Observable<any> {
        return this.httpClient.get(`api/toggle/clients`);
    }
}
