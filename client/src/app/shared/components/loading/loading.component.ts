import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'kd-loading',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingComponent {
    @Input() loading: boolean = false;
    constructor() { }
}