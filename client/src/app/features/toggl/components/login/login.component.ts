import { Component, OnInit, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { 
    ActionSettingsChangeTg, 
    selectSettings, CoreState 
} from '../../../../core';
import { selectProjects } from '../../selectors';
import { actionTogglGetProjects } from '../../actions';


@Component({
    selector: 'kp-tg-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy  {
    username = '';
    password = '';
    settings$: Subscription;
    loading: boolean = false;

    projects$: Subscription;

    selectedProject: number;
    projects;

    constructor(public store: Store<CoreState>) { }

    ngOnInit() {
        this.settings$ = this.store.pipe(select(selectSettings))
            .subscribe(settings => {
                this.username = settings.tgUsername || '';
                this.password = settings.tgPassword || '';
                this.selectedProject = settings.tgDefaultProjectId;
                if (!this.password || !this.username) return;
                
                // try to get projects list
                this.projects$ = this.store.pipe(select(selectProjects)).subscribe(projects => {
                    this.projects = projects.data;
                    this.loading = projects.loading;

                    if (this.projects || this.loading) return;
                    this.store.dispatch(actionTogglGetProjects());
                });
            });
    }

    ngOnDestroy() {
        if (this.settings$) this.settings$.unsubscribe();
    }

    addCreds() {
        this.store.dispatch(ActionSettingsChangeTg({ tgPassword: this.password, tgUsername: this.username, tgDefaultProjectId: this.selectedProject }));
    }
}