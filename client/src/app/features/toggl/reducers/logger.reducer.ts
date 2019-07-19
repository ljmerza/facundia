import { createReducer, on } from '@ngrx/store';
import { LoggerState } from '../models';

import {
    actionTogglAddLogger,
    actionTogglAddLoggerSuccess,
    actionTogglAddLoggerError,
} from '../actions';


export const initialLoggerState: LoggerState = {
    loading: false,
};

export const LoggerReducer = createReducer(
    initialLoggerState,
    on(actionTogglAddLogger, (state: LoggerState = initialLoggerState) => ({ ...state, loading: true })),
    on(actionTogglAddLoggerSuccess, (state: LoggerState = initialLoggerState, payload) => ({ ...state, loading: false, data: payload.data })),
    on(actionTogglAddLoggerError, (state: LoggerState = initialLoggerState, payload) => ({ ...state, loading: false, error: payload.error })),
);