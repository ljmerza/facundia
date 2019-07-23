import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

import { selectSettings, SettingsState } from './../../../core/settings';


@Injectable()
export class ProjectsService {
    private unsubscribe$: Subject<void> = new Subject<void>();
    settings: SettingsState;

    constructor(private httpClient: HttpClient, private store: Store<{}>) {
        store.pipe(select(selectSettings), takeUntil(this.unsubscribe$)).subscribe(settings => this.settings = settings);
    }

    getProjects(): Observable<any> {
        const authKey = window.btoa(`${this.settings.tgUsername}:${this.settings.tgPassword}`);
        return this.httpClient.get(`api/toggle/projects?authKey=${authKey}`);
    }
}
