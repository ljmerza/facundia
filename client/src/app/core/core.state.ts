import {
  ActionReducerMap,
  MetaReducer,
  createFeatureSelector,
} from '@ngrx/store';

import { routerReducer, RouterReducerState } from '@ngrx/router-store';

import { environment } from '../../environments/environment';

import { initStateFromLocalStorage } from './meta-reducers/init-state-from-local-storage.reducer';
import { debug } from './meta-reducers/debug.reducer';
import { RouterStateUrl } from './router/router.state';
import { settingsReducer } from './settings/settings.reducer';
import { SettingsState } from './settings/settings.model';

export const reducers: ActionReducerMap<CoreState> = {
  settings: settingsReducer,
  router: routerReducer
};

export const metaReducers: MetaReducer<CoreState>[] = [
  initStateFromLocalStorage
];

if (!environment.production) {
  if (!environment.test) {
    metaReducers.unshift(debug);
  }
}

export const selectSettingsState = createFeatureSelector<CoreState, SettingsState>('settings');
export const selectRouterState = createFeatureSelector<CoreState, RouterReducerState<RouterStateUrl>>('router');

export interface CoreState {
  settings: SettingsState;
  router: RouterReducerState<RouterStateUrl>;
}
