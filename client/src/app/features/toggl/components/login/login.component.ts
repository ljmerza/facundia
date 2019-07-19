import { Component, OnInit, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { 
    ActionSettingsChangeTg, 
    selectSettings, CoreState 
} from '../../../../core';


@Component({
    selector: 'kp-tg-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy  {
    username = '';
    password = '';
    settings$: Subscription;

    constructor(public store: Store<CoreState>) { }

    ngOnInit() {
        this.settings$ = this.store.pipe(select(selectSettings))
            .subscribe(settings => {
                this.username = settings.tgUsername;
                this.password = settings.tgPassword;
            });
    }

    ngOnDestroy() {
        if (this.settings$) this.settings$.unsubscribe();
    }

    addCreds() {
        this.store.dispatch(ActionSettingsChangeTg({ tgPassword: this.password, tgUsername: this.username }));
    }
}