import { Controller, Get, Param } from '@nestjs/common';
import { StoryService } from './service';
import { StoryInterface } from './interface';
import { Observable } from 'rxjs';

@Controller()
export class StoryController {
    constructor(private readonly storyService: StoryService) { }

    @Get('stories/:storyId')
    getStory(@Param('storyId') storyId): Observable<StoryInterface> {
        return this.storyService.getStory(storyId);
    }
}
