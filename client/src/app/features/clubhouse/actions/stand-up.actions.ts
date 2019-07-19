import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';

export const actionClubhouseGetStandUp = createAction('[Clubhouse] Stand Up', props<{ username: string }>());
export const actionClubhouseGetStandUpSuccess = createAction('[Clubhouse] Stand Up Success', props<{ data: any }>());
export const actionClubhouseGetStandUpError = createAction('[Clubhouse] Stand Up Error', props<{ error: HttpErrorResponse }>());
