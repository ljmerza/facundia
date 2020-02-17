import {
    ActionReducerMap,
    createFeatureSelector
} from '@ngrx/store';

import { clientsReducer, loggerReducer, projectsReducer, entriesReducer } from './reducers';
import { LoggerState, ClientsState, ProjectsState, EntriesState } from './models';


export const reducers: ActionReducerMap<TogglState> = {
    logger: loggerReducer,
    clients: clientsReducer,
    projects: projectsReducer,
    entries: entriesReducer,
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