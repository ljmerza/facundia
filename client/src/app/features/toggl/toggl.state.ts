import {
    ActionReducerMap,
    createFeatureSelector
} from '@ngrx/store';

import { ClientsReducer, LoggerReducer, ProjectsReducer } from './reducers';
import { LoggerState, ClientsState, ProjectsState } from './models';


export const reducers: ActionReducerMap<TogglState> = {
    logger: LoggerReducer,
    clients: ClientsReducer,
    projects: ProjectsReducer,
};

export const selectTogglState = createFeatureSelector<
    TogglState
>('toggl');


export interface TogglState {
    logger: LoggerState;
    clients: ClientsState;
    projects: ProjectsState;
}