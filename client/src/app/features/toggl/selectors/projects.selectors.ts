import { createSelector } from '@ngrx/store';
import { selectTogglState, TogglState } from '../toggl.state';


export const selectProjects = createSelector(
    selectTogglState,
    (state: TogglState) => state.projects
);