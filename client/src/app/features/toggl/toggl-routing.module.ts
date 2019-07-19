import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
    LogTimeComponent, LoginComponent
} from './components';

const routes: Routes = [
    {
        path: '',
        component: LogTimeComponent,
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: '**',
        redirectTo: 'login',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TogglRoutingModule { }
