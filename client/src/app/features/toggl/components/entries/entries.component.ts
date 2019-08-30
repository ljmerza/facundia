import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { CoreState } from '../../../../core';
import { selectEntries } from '../../selectors';
import { actionTogglGetEntries } from '../../actions';

import { secondsToHm } from '../../tools';

@Component({
    selector: 'kp-tg-entries',
    templateUrl: './entries.component.html',
    styleUrls: ['./entries.component.scss'],
})
export class EntriesComponent implements OnInit, OnDestroy {
    loading: boolean = false;
    entries$: Subscription;
    entries;

    @Input() projects;

    calendarFormat = {
        sameDay: '[Today]',
        nextDay: '[Tomorrow]',
        nextWeek: 'dddd',
        lastDay: '[Yesterday]',
        lastWeek: '[Last] dddd',
        sameElse: 'DD/MM/YYYY'
    }

    displayedColumns: string[] = ['at', 'duration', 'description', 'pidName'];

    constructor(public store: Store<CoreState>) { }

    ngOnInit() {
        this.fetchEntries();
    }

    ngOnDestroy() {
        if (this.entries$) this.entries$.unsubscribe();
    }

    private fetchEntries() {
        this.store.dispatch(actionTogglGetEntries());

        // try to get entries list
        this.entries$ = this.store.pipe(select(selectEntries)).subscribe(entries => {
            this.entries = (entries.data || []).map(this.formatEntry.bind(this));
            this.loading = entries.loading;
        });
    }

    private formatEntry(entry) {
        entry.pidName = (this.projects.find(project => project.id === entry.pid) || {}).name || '';
        entry.durationHours = secondsToHm(entry.duration);
        return entry;
    }
}