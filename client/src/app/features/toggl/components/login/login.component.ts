import { Component, OnInit, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { 
    ActionSettingsChangeTg, 
    selectSettings, CoreState 
} from '../../../../core';
import { selectClients, } from '../../selectors';
import { actionTogglGetClients } from '../../actions';


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

    clients$: Subscription;

    selectedClient: number;
    clients;

    constructor(public store: Store<CoreState>) { }

    ngOnInit() {
        this.settings$ = this.store.pipe(select(selectSettings))
            .subscribe(settings => {
                this.username = settings.tgUsername || '';
                this.password = settings.tgPassword || '';
                this.selectedClient = settings.tgDefaultClientId;
                if (!this.password || !this.username) return;
                
                // try to get clients list
                this.clients$ = this.store.pipe(select(selectClients)).subscribe(clients => {
                    this.clients = clients.data;
                    this.loading = clients.loading;

                    if (this.clients || this.loading) return;
                    this.store.dispatch(actionTogglGetClients());
                });
            });
    }

    ngOnDestroy() {
        if (this.settings$) this.settings$.unsubscribe();
    }

    addCreds() {
        this.store.dispatch(ActionSettingsChangeTg({ tgPassword: this.password, tgUsername: this.username, tgDefaultClientId: this.selectedClient }));
    }
}