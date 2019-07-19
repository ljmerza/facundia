import { Injectable, HttpService, } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ConfigService } from '../../config';

@Injectable()
export class TogglApiService {
    constructor(private readonly httpService: HttpService, private readonly config: ConfigService) { 
        this.config = config;
    }

    private get baseUrl(): string {
        return this.config.get('TOGGL_URL');
    }

    private setHeaders(authKey){
        return {
            headers: {
                'Authorization': `Basic ${authKey}`,
                'Content-Type': 'application/json',
            }
        };
    }

    getData(urlPath, authKey): Observable<any> {
        const url = `${this.baseUrl}/${urlPath}`;
        return this.httpService.get(url, {
            ...this.setHeaders(authKey)
        });
    }

    postData(urlPath, authKey, body): Observable<any> {
        const url = `${this.baseUrl}/${urlPath}}`;
        return this.httpService.post(url, {
            body,
            ...this.setHeaders(authKey)
        });
    }
}
