import { createSelector } from '@ngrx/store';

import { selectClubhouseState, ClubhouseState } from '../clubhouse.state';

export const selectStandUp = createSelector(
    selectClubhouseState,
    (state: ClubhouseState) => state.standUp
);