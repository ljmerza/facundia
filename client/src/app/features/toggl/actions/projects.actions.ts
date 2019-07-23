import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';


export const actionTogglGetProjects = createAction('[Toggl] Project');
export const actionTogglGetProjectsSuccess = createAction('[Toggl] Project Success', props<{ data: any }>());
export const actionTogglGetProjectsError = createAction('[Toggl] Project Error', props<{ error: HttpErrorResponse }>());
