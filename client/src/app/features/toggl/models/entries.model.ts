import { HttpErrorResponse } from '@angular/common/http';

export interface EntrieInterface {

}

export interface EntriesState {
    data?: EntrieInterface[]
    error?: HttpErrorResponse
    loading: boolean
}
