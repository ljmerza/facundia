import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ClientsService {
    constructor(private httpClient: HttpClient) { }

    getClients(data): Observable<any> {
        const authKey = window.btoa(`${data.username}:${data.password}`);
        return this.httpClient.get(`api/toggle/clients?authKey=${authKey}`, );
    }
}
