import { HttpErrorResponse } from '@angular/common/http';

export interface ClientInterface {

}

export interface ClientState {
    data?: ClientInterface[]
    error?: HttpErrorResponse
    loading: boolean
}
