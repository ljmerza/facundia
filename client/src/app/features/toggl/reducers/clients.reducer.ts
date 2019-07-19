import { createReducer, on } from '@ngrx/store';
import { ClientsState } from '../models';

import {
    actionTogglGetClients,
    actionTogglGetClientsSuccess,
    actionTogglGetClientsError,
} from '../actions';


export const initialClientState: ClientsState = {
    loading: false,
};

export const ClientReducer = createReducer(
    initialClientState,
    on(actionTogglGetClients, (state: ClientsState = initialClientState) => ({ ...state, loading: true })),
    on(actionTogglGetClientsSuccess, (state: ClientsState = initialClientState, payload) => ({ ...state, loading: false, data: payload.data })),
    on(actionTogglGetClientsError, (state: ClientsState = initialClientState, payload) => ({ ...state, loading: false, error: payload.error })),
);