import { Module } from '@nestjs/common';

import {
    ProfileModule, ProjectModule,
    StoryModule, StandUpModule,
    WorkflowModule, IterationModule,
} from './';


@Module({
    imports: [
        ProfileModule,
        ProjectModule,
        StoryModule,
        StandUpModule,
        WorkflowModule,
        IterationModule
    ],
    exports: [
        ProfileModule,
        ProjectModule,
        StoryModule,
        StandUpModule,
        WorkflowModule,
        IterationModule,
    ]
})
export class ClubhouseModule { }
