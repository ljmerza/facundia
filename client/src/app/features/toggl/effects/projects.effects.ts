
import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { of } from 'rxjs';
import {
    map,
    catchError,
    switchMap,
} from 'rxjs/operators';

import {
    actionTogglGetProjects,
    actionTogglGetProjectsSuccess,
    actionTogglGetProjectsError,
} from '../actions';
import { ProjectsService } from '../services';
import { NotificationService } from '@app/core/notifications/notification.service';

@Injectable()
export class ProjectsEffects {
    constructor(private actions$: Actions<any>, private service: ProjectsService, private notifications: NotificationService) { }

    @Effect()
    getProjects = this.actions$.pipe(
        ofType(actionTogglGetProjects),
        switchMap(() =>
            this.service.getProjects().pipe(
                map(response => actionTogglGetProjectsSuccess({data: response}),
                catchError(error => {
                    this.notifications.error(error);
                    return of(actionTogglGetProjectsError({ error }));
                })
            )
        )
    ))
}