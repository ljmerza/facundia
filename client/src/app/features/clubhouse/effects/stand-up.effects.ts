import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { of } from 'rxjs';
import {
    map,
    catchError,
    switchMap,
} from 'rxjs/operators';

import {
    actionClubhouseGetStandUp,
    actionClubhouseGetStandUpSuccess,
    actionClubhouseGetStandUpError,
} from '../actions';
import { StandUpService } from '../services';
import { NotificationService } from '@app/core/notifications/notification.service';

@Injectable()
export class StandUpEffects {
    constructor(private actions$: Actions<any>, private service: StandUpService, private notifications: NotificationService) { }

    @Effect()
    getStandUp = this.actions$.pipe(
        ofType(actionClubhouseGetStandUp),
        switchMap(({username}) =>
            this.service.getStandUp({username}).pipe(
                map(response => actionClubhouseGetStandUpSuccess({data: response}),
                catchError(error => {
                    this.notifications.error(error);
                    return of(actionClubhouseGetStandUpError({ error }));
                })
            )
        )
    ))
}