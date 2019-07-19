import { createSelector } from '@ngrx/store';
import { selectTogglState, TogglState } from '../toggl.state';


export const selectClients = createSelector(
    selectTogglState,
    (state: TogglState) => state.clients
);