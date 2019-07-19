import { HttpErrorResponse } from '@angular/common/http';

export interface StandUp {

}

export interface StandUpState {
    data?: StandUp[]
    error?: HttpErrorResponse
    loading: boolean
}
