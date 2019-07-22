import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { SharedModule } from '../../shared';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { TogglRoutingModule } from './toggl-routing.module';

import {
    LoggerService, ClientsService
} from './services';

import {
    LoggerEffects, ClientsEffects,
} from './effects';

import {
    reducers
} from './toggl.state';

import {
    LogTimeComponent, LoginComponent
} from './components';


@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        TogglRoutingModule,
        NgbModule,

        StoreModule.forFeature('toggl', reducers),
        EffectsModule.forFeature([
            LoggerEffects, ClientsEffects
        ]),
    ],
    providers: [
        LoggerService, ClientsService
    ],
    declarations: [
        LogTimeComponent, LoginComponent
    ]
})
export class TogglModule { }