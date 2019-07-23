import { createReducer, on } from '@ngrx/store';
import { ClientsState } from '../models';

import {
    actionTogglGetClients,
    actionTogglGetClientsSuccess,
    actionTogglGetClientsError,
} from '../actions';


export const initialClientsState: ClientsState = {
    loading: false,
};

export const ClientsReducer = createReducer(
    initialClientsState,
    on(actionTogglGetClients, (state: ClientsState = initialClientsState) => ({ ...state, loading: true })),
    on(actionTogglGetClientsSuccess, (state: ClientsState = initialClientsState, payload) => ({ ...state, loading: false, data: payload.data })),
    on(actionTogglGetClientsError, (state: ClientsState = initialClientsState, payload) => ({ ...state, loading: false, error: payload.error })),
);