import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

import { selectSettings, SettingsState } from './../../../core/settings';

@Injectable()
export class LoggerService {
	private unsubscribe$: Subject<void> = new Subject<void>();
	settings: SettingsState;

	constructor(private httpClient: HttpClient, private store: Store<{}>) {
		store.pipe(select(selectSettings), takeUntil(this.unsubscribe$)).subscribe((settings) => (this.settings = settings));
	}

	addLog(body): Observable<any> {
		return this.httpClient.post(
			`api/toggl/logtime`,
			{
				time_entry: body,
			},
			{
				headers: {
					Authorization: `Basic ${this.settings.tgToken}`,
				},
			}
		);
	}
}
