import { createReducer, on } from '@ngrx/store';
import { ProjectsState } from '../models';

import {
    actionTogglGetProjects,
    actionTogglGetProjectsSuccess,
    actionTogglGetProjectsError,
} from '../actions';


export const initialProjectsState: ProjectsState = {
    loading: false,
};

const _projectsReducer = createReducer(
    initialProjectsState,
    on(actionTogglGetProjects, (state: ProjectsState = initialProjectsState) => ({ ...state, loading: true })),
    on(actionTogglGetProjectsSuccess, (state: ProjectsState = initialProjectsState, payload) => ({ ...state, loading: false, data: payload.data })),
    on(actionTogglGetProjectsError, (state: ProjectsState = initialProjectsState, payload) => ({ ...state, loading: false, error: payload.error })),
);

export function projectsReducer(state: ProjectsState, action: any) {
    return _projectsReducer(state, action);
}