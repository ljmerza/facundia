import { Injectable, HttpService } from '@nestjs/common';
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

	private setHeaders(): { headers: { 'Clubhouse-Token'; 'Content-Type' } } {
		return {
			headers: {
				'Clubhouse-Token': this.apiToken,
				'Content-Type': 'application/json',
			},
		};
	}

	getData(urlPath): Observable<any> {
		const url = `${this.baseUrl}/${urlPath}`;
		return this.httpService.get(url, {
			...this.setHeaders(),
		});
	}

	postData(urlPath, body): Observable<any> {
		const url = `${this.baseUrl}/${urlPath}`;
		return this.httpService.post(url, {
			body,
			...this.setHeaders(),
		});
	}
}
