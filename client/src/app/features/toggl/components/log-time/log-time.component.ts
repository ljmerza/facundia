import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from "@angular/router";
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as moment from 'moment';

import { ROUTE_ANIMATIONS_ELEMENTS, selectSettings } from '../../../../core';
import { actionTogglGetClients, actionTogglAddLogger } from '../../actions';
import { selectClients, selectLogger } from '../../selectors';


@Component({
    selector: 'kp-tg-log-time',
    templateUrl: './log-time.component.html',
    styleUrls: ['./log-time.component.scss'],
})
export class LogTimeComponent implements OnInit, OnDestroy  {
    routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

    settings$: Subscription;
    defaultClient$: Subscription;
    clients$: Subscription;
    getClients$: Subscription;
    addLog$: Subscription;

    loading: boolean = false;

    clients;
    selectedClient: number;

    description = '';
    
    logTime = { hour: 8, minute: 0 };
    hourStep = 1;
    minuteStep = 15;

    defaultPayload = {
        "billable": true,
        "created_with": "Snowball",
    };

    timeLogFormat = 'YYYY-MM-DDTHH:mm:ss';
    timeZone = '-04:00';
    loadedSettings = false;

    constructor(public store: Store<any>, private router: Router) { }

    ngOnInit() {
        this.settings$ = this.store.pipe(select(selectSettings))
            .subscribe(settings => {
                // if no username/password then go to login page else get stand up data
                if (!settings.tgUsername || !settings.tgPassword) {
                    this.router.navigate(['/toggl/login']);
                    return;
                }

                this.selectedClient = settings.tgDefaultClientId;

                // try to get clients list
                this.clients$ = this.store.pipe(select(selectClients)).subscribe(clients => {
                    this.clients = clients.data;
                    this.loading = clients.loading;

                    if (this.clients || this.loading) return;
                    this.store.dispatch(actionTogglGetClients());
                });
            });
        
        this.addLog$ = this.store.pipe(select(selectLogger))
            .subscribe(logger => {
                console.log({ logger });
            });
    }

    ngOnDestroy(){
        if (this.settings$) this.settings$.unsubscribe();
        if (this.defaultClient$) this.defaultClient$.unsubscribe();
        if (this.clients$) this.clients$.unsubscribe();
        if (this.getClients$) this.clients$.unsubscribe();
        if (this.addLog$) this.clients$.unsubscribe();
    }

    submitTime(){
        const hours = this.logTime.hour;
        const minutes = this.logTime.minute;
        const durationInSeconds = (hours*60*60) + (minutes*60);

        const startOfLog = moment().startOf('day');
        const endOfLog = moment().startOf('day').add(hours, 'hours').add(minutes, 'minutes');
        const selectedClientWid = this.clients.find(client => client.id === this.selectedClient).wid;

        const payload = {
            ...this.defaultPayload,
            description: this.description,
            duration: durationInSeconds,
            wid: selectedClientWid,
            start: (startOfLog.format(this.timeLogFormat) + this.timeZone),
            stop: (endOfLog.format(this.timeLogFormat) + this.timeZone),
        };

        if (!payload.description || !payload.duration) return;
        this.store.dispatch(actionTogglAddLogger({log: payload}));
    }
}