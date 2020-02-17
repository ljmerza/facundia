import {
    ActionReducerMap,
    createFeatureSelector
} from '@ngrx/store';

import { standUpReducer } from './reducers';
import { StandUpState } from './models';


export const reducers: ActionReducerMap<ClubhouseState> = {
    standUp: standUpReducer,
};

export const selectClubhouseState = createFeatureSelector<
    ClubhouseState
>('clubhouse');


export interface ClubhouseState {
    standUp: StandUpState;
}