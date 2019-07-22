import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';

export const actionTogglGetClients = createAction('[Toggl] Client');
export const actionTogglGetClientsSuccess = createAction('[Toggl] Client Success', props<{ data: any }>());
export const actionTogglGetClientsError = createAction('[Toggl] Client Error', props<{ error: HttpErrorResponse }>());
