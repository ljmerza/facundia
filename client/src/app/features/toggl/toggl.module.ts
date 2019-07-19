import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ClubhouseRoutingModule } from './clubhouse-routing.module';

import { 
    StandUpComponent, CardComponent, LoginComponent 
} from './components';

import {
    StandUpService
} from './services';

import {
    StandUpEffects
} from './effects';

import {
    reducers
} from './clubhouse.state';


@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        ClubhouseRoutingModule,

        StoreModule.forFeature('clubhouse', reducers),
        EffectsModule.forFeature([
            StandUpEffects
        ]),
    ],
    providers: [
        StandUpService
    ],
    declarations: [
        StandUpComponent, CardComponent, LoginComponent
    ]
})
export class ClubhouseModule { }