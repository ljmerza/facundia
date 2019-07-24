import { HttpErrorResponse } from '@angular/common/http';

export interface LoggerInterface {
    billable: boolean
    created_with: string;
    description: string;
    duration: number
    start: string;
    stop: string;
    wid: number;
    pid: number;
}

export interface LoggerState {
    data?: LoggerInterface
    error?: HttpErrorResponse
    loading: boolean
}
