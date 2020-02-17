import { createReducer, on } from '@ngrx/store';
import { EntriesState } from '../models';

import {
    actionTogglGetEntries,
    actionTogglGetEntriesSuccess,
    actionTogglGetEntriesError,
} from '../actions';


export const initialEntriesState: EntriesState = {
    loading: false,
};

const _entriesReducer = createReducer(
    initialEntriesState,
    on(actionTogglGetEntries, (state: EntriesState = initialEntriesState) => ({ ...state, loading: true })),
    on(actionTogglGetEntriesSuccess, (state: EntriesState = initialEntriesState, payload) => ({ ...state, loading: false, data: payload.data })),
    on(actionTogglGetEntriesError, (state: EntriesState = initialEntriesState, payload) => ({ ...state, loading: false, error: payload.error })),
);

export function entriesReducer(state: EntriesState, action: any) {
    return _entriesReducer(state, action);
}