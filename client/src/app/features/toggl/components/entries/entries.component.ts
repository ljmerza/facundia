import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { CoreState } from '../../../../core';
import { selectEntries } from '../../selectors';
import { actionTogglGetEntries } from '../../actions';


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


    displayedColumns: string[] = ['at', 'duration', 'description', 'pidName'];

    constructor(public store: Store<CoreState>) { }

    ngOnInit() {
        this.store.dispatch(actionTogglGetEntries());

        // try to get entries list
        this.entries$ = this.store.pipe(select(selectEntries)).subscribe(entries => {
            console.log({ projects: this.projects, e: entries.data })
            this.entries = (entries.data || []).map(this.mapPidToProject.bind(this));
            this.loading = entries.loading;
        });
    }

    private mapPidToProject(entry) {
        entry.pidName = (this.projects.find(project => project.id === entry.pid) || {}).name || '';
        return entry;
    }

    ngOnDestroy() {
        if (this.entries$) this.entries$.unsubscribe();
    }
}