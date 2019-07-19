import { Module } from '@nestjs/common';

import {
    TogglApiModule, 
    TogglWorkSpaceModule,
    TogglClientsModule,
} from './';


@Module({
    imports: [
        TogglApiModule,
        TogglWorkSpaceModule,
        TogglClientsModule,
    ],
    exports: [
    ]
})
export class TogglModule { }
