import { Component, OnInit, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';


@Component({
    selector: 'kp-tg-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy  {

    constructor() { }

    ngOnInit() {
    }

    ngOnDestroy(){
    }

}