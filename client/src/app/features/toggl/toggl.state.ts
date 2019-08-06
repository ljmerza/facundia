import {
    ActionReducerMap,
    createFeatureSelector
} from '@ngrx/store';

import { ClientsReducer, LoggerReducer, ProjectsReducer, EntriesReducer } from './reducers';
import { LoggerState, ClientsState, ProjectsState, EntriesState } from './models';


export const reducers: ActionReducerMap<TogglState> = {
    logger: LoggerReducer,
    clients: ClientsReducer,
    projects: ProjectsReducer,
    entries: EntriesReducer,
};

export const selectTogglState = createFeatureSelector<
    TogglState
>('toggl');


export interface TogglState {
    logger: LoggerState;
    clients: ClientsState;
    projects: ProjectsState;
    entries: EntriesState;
}