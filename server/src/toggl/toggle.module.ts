import { Module } from '@nestjs/common';

import {
    TogglApiModule, 
    TogglWorkSpaceModule,
    TogglClientsModule,
    TogglProjectsModule,
    TogglLoggerModule,
    TogglEntriesModule,
} from './';


@Module({
    imports: [
        TogglApiModule,
        TogglWorkSpaceModule,
        TogglClientsModule,
        TogglProjectsModule,
        TogglLoggerModule,
        TogglEntriesModule,
    ],
    exports: [
    ]
})
export class TogglModule { }
