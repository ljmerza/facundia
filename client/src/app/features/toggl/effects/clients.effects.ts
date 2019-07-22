
import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { of } from 'rxjs';
import {
    map,
    catchError,
    switchMap,
} from 'rxjs/operators';

import {
    actionTogglGetClients,
    actionTogglGetClientsSuccess,
    actionTogglGetClientsError,
} from '../actions';
import { ClientsService } from '../services';
import { NotificationService } from '@app/core/notifications/notification.service';

@Injectable()
export class ClientsEffects {
    constructor(private actions$: Actions<any>, private service: ClientsService, private notifications: NotificationService) { }

    @Effect()
    getClients = this.actions$.pipe(
        ofType(actionTogglGetClients),
        switchMap(() =>
            this.service.getClients().pipe(
                map(response => actionTogglGetClientsSuccess({data: response}),
                catchError(error => {
                    this.notifications.error(error);
                    return of(actionTogglGetClientsError({ error }));
                })
            )
        )
    ))
}