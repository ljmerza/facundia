import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class LoggerService {
    constructor(private httpClient: HttpClient) { }

    addLog(body): Observable<any> {
        return this.httpClient.post(`api/toggle/addlog`, body);
    }
}
