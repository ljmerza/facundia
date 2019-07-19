import { Module } from '@nestjs/common';

import {
    TogglApiModule, 
    TogglWorkSpaceModule,
    TogglClientsModule,
    TogglProjectsModule,
    TogglLoggerModule,
} from './';


@Module({
    imports: [
        TogglApiModule,
        TogglWorkSpaceModule,
        TogglClientsModule,
        TogglProjectsModule,
        TogglLoggerModule,
    ],
    exports: [
    ]
})
export class TogglModule { }
