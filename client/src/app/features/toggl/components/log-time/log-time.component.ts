import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from "@angular/router";
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as moment from 'moment';

import { ROUTE_ANIMATIONS_ELEMENTS, selectSettings } from '../../../../core';
import { actionTogglGetClients } from '../../actions';
import { selectClients } from '../../selectors';


@Component({
    selector: 'kp-tg-log-time',
    templateUrl: './log-time.component.html',
    styleUrls: ['./log-time.component.scss'],
})
export class LogTimeComponent implements OnInit, OnDestroy  {
    routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

    clients$: Subscription;
    addLog$: Subscription;
    loading: boolean = false;

    clients;
    
    log = {

    };

    constructor(public store: Store<any>, private router: Router) { }

    ngOnInit() {
        this.clients$ = this.store.pipe(select(selectSettings))
            .subscribe(settings => {
                // if no username/password then go to login page else get stand up data
                if (!settings.tgUsername || !settings.tgPassword) {
                    this.router.navigate(['/toggl/login']);
                    return;
                }

                this.loading = true;
                this.clients$ = this.store.pipe(select(selectClients)).subscribe(clients => this.clients = clients.data);
                this.store.dispatch(actionTogglGetClients({ username: settings.tgUsername, password: settings.tgPassword}));
            });
    }

    ngOnDestroy(){
    }

}