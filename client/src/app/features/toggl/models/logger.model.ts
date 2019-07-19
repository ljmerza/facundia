import { HttpErrorResponse } from '@angular/common/http';

export interface LoggerInterface {

}

export interface LoggerState {
    data?: LoggerInterface
    error?: HttpErrorResponse
    loading: boolean
}
