import { createSelector } from '@ngrx/store';
import { selectTogglState, TogglState } from '../toggl.state';


export const selectLogger = createSelector(
    selectTogglState,
    (state: TogglState) => state.logger
);