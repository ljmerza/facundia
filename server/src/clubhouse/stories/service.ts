import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { StoryInterface } from './interface';
import { ClubhouseApiService } from '../api';

@Injectable()
export class StoryService {
    constructor(private readonly apiService: ClubhouseApiService) { }

    getStory(storyId): Observable<StoryInterface> {
        return this.apiService.getData(`stories/${storyId}`)
            .pipe(map(response => response.data));
    }
}
