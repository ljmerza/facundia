import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';

export const actionTogglGetEntries = createAction('[Toggl] Entries');
export const actionTogglGetEntriesSuccess = createAction('[Toggl] Entries Success', props<{ data: any }>());
export const actionTogglGetEntriesError = createAction('[Toggl] Entries Error', props<{ error: HttpErrorResponse }>());
