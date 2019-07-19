import { Component, OnInit, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';


@Component({
    selector: 'kp-tg-log-time',
    templateUrl: './log-time.component.html',
    styleUrls: ['./log-time.component.scss'],
})
export class LogTimeComponent implements OnInit, OnDestroy  {

    constructor() { }

    ngOnInit() {
    }

    ngOnDestroy(){
    }

}