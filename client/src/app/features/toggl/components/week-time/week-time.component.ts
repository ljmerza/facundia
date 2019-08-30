import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import * as moment from 'moment';
import { secondsToHm } from '../../tools';

@Component({
    selector: 'kp-tg-week-time',
    templateUrl: './week-time.component.html',
    styleUrls: ['./week-time.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeekTimeComponent  {
    weekTimeLeftToWork: string;
    weekTimeWorked: string;
    timeCanLeave: string;

    @Input() entries;

    ngOnChanges() {
        this.getHoursLoggedThisWeek();
    }

    private getHoursLoggedThisWeek() {
        const startOfWeeek = moment().startOf('week').startOf('day');

        const secondsThisWeekWorked = (this.entries || []).reduce((acc, entry) => {
            const entryStart = moment(new Date(entry.start));
            if (entryStart.isAfter(startOfWeeek)) acc += entry.duration;
            return acc;
        }, 0);

        const fortyHourWorkSeconds = 40 * 60 * 60;
        const secondsLeftInWorkWeek = fortyHourWorkSeconds - secondsThisWeekWorked;

        this.weekTimeLeftToWork = secondsToHm(secondsLeftInWorkWeek);
        this.weekTimeWorked = secondsToHm(secondsThisWeekWorked);

        // if less than 8 hours left then most likely it's friday so say what time
        // i can leave on friday to meet 40 hours
        if ((8 * 60 * 60) > secondsLeftInWorkWeek) {
            const thisWeeksFriday = moment()
                .startOf('week').add('days', 5)
                .hour(8).minute(0);

            this.timeCanLeave = thisWeeksFriday
                .add('seconds', secondsLeftInWorkWeek)
                .format(`hh:mma`);
        }
    }
}