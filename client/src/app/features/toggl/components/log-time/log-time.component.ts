import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from "@angular/router";
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as moment from 'moment';

import { ROUTE_ANIMATIONS_ELEMENTS, selectSettings } from '../../../../core';
import { actionTogglGetProjects, actionTogglAddLogger } from '../../actions';
import { selectProjects, selectLogger } from '../../selectors';
import { LoggerInterface } from '../../models';


@Component({
    selector: 'kp-tg-log-time',
    templateUrl: './log-time.component.html',
    styleUrls: ['./log-time.component.scss'],
})
export class LogTimeComponent implements OnInit, OnDestroy  {
    routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

    settings$: Subscription;
    addLog$: Subscription;
    
    loading: boolean = false;
    loadingAddLog: boolean = false;
    
    projects$: Subscription;
    projects;
    selectedProject: number;

    description = '';
    logTime = { hour: 8, minute: 0 };
    hourStep = 1;
    minuteStep = 15;

    offsetHours = 2;

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

                this.selectedProject = settings.tgDefaultProjectId;

                // try to get projects list
                this.projects$ = this.store.pipe(select(selectProjects)).subscribe(projects => {
                    this.projects = projects.data;
                    this.loading = projects.loading;

                    if (this.projects || this.loading) return;
                    this.store.dispatch(actionTogglGetProjects());
                });
            });
        
        this.addLog$ = this.store.pipe(select(selectLogger))
            .subscribe(logger => {
                this.loadingAddLog = logger.loading;
            });
    }

    ngOnDestroy(){
        if (this.settings$) this.settings$.unsubscribe();
        if (this.projects$) this.projects$.unsubscribe();
        if (this.addLog$) this.addLog$.unsubscribe();
    }

    submitTime(){
        const hours = this.logTime.hour;
        const minutes = this.logTime.minute;
        const durationInSeconds = (hours*60*60) + (minutes*60);


        // add offsetHours to make sure we dont hit day light savings
        const startOfLog = moment().startOf('day').add(this.offsetHours, 'hours');
        const endOfLog = moment().startOf('day').add(this.offsetHours+ hours, 'hours').add(minutes, 'minutes');
        const selectedClientWid = this.projects.find(client => client.id === this.selectedProject).wid;

        const log: LoggerInterface = {
            ...this.defaultPayload,
            pid: this.selectedProject,
            description: this.description,
            duration: durationInSeconds,
            wid: selectedClientWid,
            start: (startOfLog.format(this.timeLogFormat) + this.timeZone),
            stop: (endOfLog.format(this.timeLogFormat) + this.timeZone),
        };

        if (!log.description || !log.duration) return;
        
        this.resetLog();
        this.store.dispatch(actionTogglAddLogger({ log }));
    }

    private resetLog() {
        this.logTime = { hour: 8, minute: 0 };
        this.description = '';
    }
}