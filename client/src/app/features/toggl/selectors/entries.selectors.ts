import { createSelector } from '@ngrx/store';
import { selectTogglState, TogglState } from '../toggl.state';


export const selectEntries = createSelector(
    selectTogglState,
    (state: TogglState) => state.entries
);