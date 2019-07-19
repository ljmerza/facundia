import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { ClientInterface } from '../models'

export const actionTogglGetClients = createAction('[Toggl] Client', props<{ clients: ClientInterface[] }>());
export const actionTogglGetClientsSuccess = createAction('[Toggl] Client Success', props<{ data: any }>());
export const actionTogglGetClientsError = createAction('[Toggl] Client Error', props<{ error: HttpErrorResponse }>());
