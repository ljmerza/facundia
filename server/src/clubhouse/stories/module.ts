import { Module } from '@nestjs/common';
import { StoryService } from './service';
import { StoryController } from './controller';
import { ClubhouseApiModule } from '../api';

@Module({
    imports: [ClubhouseApiModule],
    controllers: [StoryController],
    providers: [StoryService],
    exports: [StoryService]
})
export class StoryModule { }
