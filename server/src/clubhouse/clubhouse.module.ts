import { Module } from '@nestjs/common';

import {
    ProfileModule, ProjectModule,
    StoryModule, StandUpModule,
    WorkflowModule
} from './';


@Module({
    imports: [
        ProfileModule,
        ProjectModule,
        StoryModule,
        StandUpModule,
        WorkflowModule,
    ],
    exports: [
        ProfileModule,
        ProjectModule,
        StoryModule,
        StandUpModule,
        WorkflowModule
    ]
})
export class ClubhouseModule { }
