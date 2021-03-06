import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class StandUpService {
    constructor(private httpClient: HttpClient) { }

    getStandUp({username}): Observable<any> {
        return this.httpClient.get(`api/standup/${username}`);
    }
}
