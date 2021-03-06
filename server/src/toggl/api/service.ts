import { Injectable, HttpService } from '@nestjs/common';
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

	private setHeaders(authKey: string): { headers: { authorization; 'Content-Type' } } {
		const token = authKey.replace(/Basic /, '');

		return {
			headers: {
				authorization: `Basic ${Buffer.from(`${token}:api_token`, 'binary').toString('base64')}`,
				'Content-Type': 'application/json',
			},
		};
	}

	getData(urlPath: string, authKey: string): Observable<any> {
		const url = `${this.baseUrl}/${urlPath}`;
		return this.httpService.get(url, {
			...this.setHeaders(authKey),
		});
	}

	postData(urlPath: string, authKey: string, body: any): Observable<any> {
		const url = `${this.baseUrl}/${urlPath}`;
		return this.httpService.post(url, body, {
			...this.setHeaders(authKey),
		});
	}
}
