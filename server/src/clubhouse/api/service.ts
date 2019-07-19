import { Injectable, HttpService, } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ConfigService } from '../../config';

@Injectable()
export class ClubhouseApiService {
    constructor(private readonly httpService: HttpService, private readonly config: ConfigService) { 
        this.config = config;
    }

    get baseUrl(): string {
        return this.config.get('CH_URL');
    }

    get apiToken(): string {
        return this.config.get('CH_TOKEN');
    }

    getData(urlPath): Observable<any> {
        return this.httpService.get(`${this.baseUrl}/${urlPath}?token=${this.apiToken}`)
    }

    postData(urlPath, body): Observable<any> {
        return this.httpService.post(`${this.baseUrl}/${urlPath}?token=${this.apiToken}`, body);
    }
}
