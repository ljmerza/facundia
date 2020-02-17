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

const _clientsReducer = createReducer(
    initialClientsState,
    on(actionTogglGetClients, (state: ClientsState = initialClientsState) => ({ ...state, loading: true })),
    on(actionTogglGetClientsSuccess, (state: ClientsState = initialClientsState, payload) => ({ ...state, loading: false, data: payload.data })),
    on(actionTogglGetClientsError, (state: ClientsState = initialClientsState, payload) => ({ ...state, loading: false, error: payload.error })),
);


export function clientsReducer(state: ClientsState, action: any) {
    return _clientsReducer(state, action);
}