import { Component, OnInit, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { ActionSettingsChangeTg, selectSettings, CoreState } from '../../../../core';
import { selectProjects } from '../../selectors';
import { actionTogglGetProjects } from '../../actions';

@Component({
	selector: 'kp-tg-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
	token = '';
	settings$: Subscription;
	loading: boolean = false;

	projects$: Subscription;

	selectedProject: number;
	projects;

	constructor(public store: Store<CoreState>) {}

	ngOnInit() {
		this.settings$ = this.store.pipe(select(selectSettings)).subscribe((settings) => {
			this.token = settings.tgToken || '';
			this.selectedProject = settings.tgDefaultProjectId;
			if (!this.token) return;

			// try to get projects list
			this.projects$ = this.store.pipe(select(selectProjects)).subscribe((projects) => {
				this.projects = projects.data;
				this.loading = projects.loading;

				if (this.projects || this.loading) return;
				this.store.dispatch(actionTogglGetProjects());
			});
		});
	}

	ngOnDestroy() {
		if (this.settings$) this.settings$.unsubscribe();
		if (this.projects$) this.projects$.unsubscribe();
	}

	addCreds() {
		this.store.dispatch(ActionSettingsChangeTg({ tgToken: this.token, tgDefaultProjectId: this.selectedProject }));
	}
}
