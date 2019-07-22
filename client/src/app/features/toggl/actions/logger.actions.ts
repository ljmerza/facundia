import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { LoggerInterface } from '../models'

export const actionTogglAddLogger = createAction('[Toggl] Logger', props<{ log: LoggerInterface }>());
export const actionTogglAddLoggerSuccess = createAction('[Toggl] Logger Success', props<{ data: any }>());
export const actionTogglAddLoggerError = createAction('[Toggl] Logger Error', props<{ error: HttpErrorResponse }>());
