import {
    ActionReducerMap,
    createFeatureSelector
} from '@ngrx/store';

import { StandUpReducer } from './reducers';
import { StandUpState } from './models';


export const reducers: ActionReducerMap<ClubhouseState> = {
    standUp: StandUpReducer,
};

export const selectClubhouseState = createFeatureSelector<
    ClubhouseState
>('clubhouse');


export interface ClubhouseState {
    standUp: StandUpState;
}