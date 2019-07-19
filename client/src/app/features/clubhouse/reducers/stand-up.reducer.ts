import { createReducer, on } from '@ngrx/store';
import { StandUpState } from '../models';

import {
    actionClubhouseGetStandUp,
    actionClubhouseGetStandUpError,
    actionClubhouseGetStandUpSuccess
} from '../actions';


export const initialState: StandUpState = {
    loading: false,
};

export const StandUpReducer = createReducer(
    initialState,
    on(actionClubhouseGetStandUp, (state: StandUpState = initialState) => ({ ...state, loading: true })),
    on(actionClubhouseGetStandUpError, (state: StandUpState = initialState, payload) => ({ ...state, loading: false, error: payload.error })),
    on(actionClubhouseGetStandUpSuccess, (state: StandUpState = initialState, payload) => ({ ...state, loading: false, data: payload.data })),
);