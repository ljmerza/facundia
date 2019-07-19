import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { MemberInterface } from './interface';
import { ClubhouseApiService } from '../api';

@Injectable()
export class ProfileService {
    constructor(private readonly apiService: ClubhouseApiService) { }

    getProfiles(): Observable<MemberInterface[]> {
        return this.apiService.getData('members')
            .pipe(map(response => response.data));

    }
}
