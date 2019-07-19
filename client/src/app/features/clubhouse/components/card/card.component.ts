import { Component, Input } from '@angular/core';

@Component({
    selector: 'kp-ch-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
})
export class CardComponent {
    constructor() { }
    @Input() card;
}