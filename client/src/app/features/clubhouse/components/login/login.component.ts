import { Component, OnInit, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { ActionSettingsChangeChUsername, selectChUsername, CoreState } from '../../../../core';


@Component({
    selector: 'kp-ch-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy  {
    username$: Subscription;
    username = '';

    constructor(public store: Store<CoreState>) { }

    ngOnInit() {
        this.username$ = this.store.pipe(select(selectChUsername))
            .subscribe(chUsername => this.username = chUsername);
    }

    ngOnDestroy(){
        if (this.username$) this.username$.unsubscribe();
    }

    addUsername() {
        this.store.dispatch(ActionSettingsChangeChUsername({ chUsername: this.username }));
    }
}