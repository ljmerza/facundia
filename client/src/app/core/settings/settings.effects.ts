import { ActivationEnd, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { select, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { interval, merge, of } from 'rxjs';

import {
	tap,
	withLatestFrom,
	map,
	distinctUntilChanged,
	mapTo,
	filter
} from 'rxjs/operators';

import { selectSettingsState } from '../core.state';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { TitleService } from '../title/title.service';

import { NotificationService } from '../notifications/notification.service';
import * as settingsActions from './settings.actions';
import { selectEffectiveTheme } from './settings.selectors';
import { State } from './settings.model';

export const SETTINGS_KEY = 'SETTINGS';
const INIT = of('kapok-init-effect-trigger');


@Injectable()
export class SettingsEffects {
	constructor(
		private actions$: Actions<any>,
		private store: Store<State>,
		private router: Router,
		private overlayContainer: OverlayContainer,
		private localStorageService: LocalStorageService,
		private titleService: TitleService,
		private notifications: NotificationService
	) {}

	@Effect()
	changeHour = interval(60_000).pipe(
		mapTo(new Date().getHours()),
		distinctUntilChanged(),
		map(hour => settingsActions.ActionSettingsChangeHour({ hour }))
	);


	@Effect({ dispatch: false })
	persistSettings = this.actions$.pipe(
		ofType(
			settingsActions.ActionSettingsChangeTheme,
			settingsActions.ActionSettingsChangeNightTheme,
			settingsActions.ActionSettingsChangeAutoNightMode,
			settingsActions.ActionSettingsChangeChToken,
			settingsActions.ActionSettingsChangeChUsername,
			settingsActions.ActionSettingsChangeTg,
		),
		withLatestFrom(this.store.pipe(select(selectSettingsState))),
		tap(([action, settings]) => {
			this.notifications.success('Saved Settings');
			this.localStorageService.setItem(SETTINGS_KEY, settings);
		})
	);

	@Effect({ dispatch: false })
	updateTheme = merge(
		INIT,
		this.actions$.pipe(ofType(settingsActions.ActionSettingsChangeTheme))
	).pipe(
		withLatestFrom(this.store.pipe(select(selectEffectiveTheme))),
		tap(([action, effectiveTheme]) => {
		const classList = this.overlayContainer.getContainerElement().classList;
		const toRemove = Array.from(classList).filter((item: string) =>
			item.includes('-theme')
		);
		if (toRemove.length) {
			classList.remove(...toRemove);
		}

		if (effectiveTheme)
			classList.add(effectiveTheme);
		})
	);

	@Effect({ dispatch: false })
	setTitle = this.router.events.pipe(filter(event => event instanceof ActivationEnd)).pipe(
		tap(() => {
			this.titleService.setTitle(this.router.routerState.snapshot.root);
		})
	);
}
