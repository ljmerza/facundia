
import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { of } from 'rxjs';
import {
    map,
    catchError,
    switchMap,
} from 'rxjs/operators';

import {
    actionTogglAddLogger,
    actionTogglAddLoggerSuccess,
    actionTogglAddLoggerError,
} from '../actions';
import { LoggerService } from '../services';
import { NotificationService } from '@app/core/notifications/notification.service';

@Injectable()
export class LoggerEffects {
    constructor(private actions$: Actions<any>, private service: LoggerService, private notifications: NotificationService) { }

    @Effect()
    addLog = this.actions$.pipe(
        ofType(actionTogglAddLogger),
        switchMap(({log}) =>{
            return this.service.addLog(log).pipe(
                map(
                    response => {
                        this.notifications.success('Added log to toggl successfully');
                        return actionTogglAddLoggerSuccess({ data: response });
                    },
                    catchError(error => {
                        this.notifications.error(error);
                        return of(actionTogglAddLoggerError({ error }));
                    })
                )
            )
        }
    ))
}