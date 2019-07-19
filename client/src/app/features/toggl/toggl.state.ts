import {
    ActionReducerMap,
    createFeatureSelector
} from '@ngrx/store';

import { ClientReducer, LoggerReducer } from './reducers';
import { LoggerState, ClientState } from './models';


export const reducers: ActionReducerMap<TogglState> = {
    logger: LoggerReducer,
    clients: ClientReducer,
};

export const selectTogglState = createFeatureSelector<
    TogglState
>('toggl');


export interface TogglState {
    logger: LoggerState;
    clients: ClientState;
}