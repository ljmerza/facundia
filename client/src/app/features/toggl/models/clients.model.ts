import { HttpErrorResponse } from '@angular/common/http';

export interface ClientInterface {

}

export interface ClientsState {
    data?: ClientInterface[]
    error?: HttpErrorResponse
    loading: boolean
}
