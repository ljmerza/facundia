
import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { of } from 'rxjs';
import {
    map,
    catchError,
    switchMap,
} from 'rxjs/operators';

import {
    actionTogglGetEntries,
    actionTogglGetEntriesSuccess,
    actionTogglGetEntriesError,
} from '../actions';
import { EntriesService } from '../services';
import { NotificationService } from '@app/core/notifications/notification.service';

@Injectable()
export class EntriesEffects {
    constructor(private actions$: Actions<any>, private service: EntriesService, private notifications: NotificationService) { }

    @Effect()
    getEntries = this.actions$.pipe(
        ofType(actionTogglGetEntries),
        switchMap(() =>
            this.service.getEntries().pipe(
                map(response => actionTogglGetEntriesSuccess({data: response}),
                catchError(error => {
                    this.notifications.error(error);
                    return of(actionTogglGetEntriesError({ error }));
                })
            )
        )
    ))
}