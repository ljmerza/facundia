import { createReducer, on } from '@ngrx/store';
import { SettingsState, NIGHT_MODE_THEME } from './settings.model';
import * as settingsActions from './settings.actions';


export const initialState: SettingsState = {
  theme: 'DEFAULT-THEME',
  autoNightMode: false,
  nightTheme: NIGHT_MODE_THEME,
  chToken: '',
  chUsername: '',
  hour: 0,
  tgUsername: '',
  tgPassword: '',
  tgDefaultProjectId: 0,
};

const _settingsReducer = createReducer(
  initialState,
  on(
    settingsActions.ActionSettingsChangeTheme,
    settingsActions.ActionSettingsChangeNightTheme,
    settingsActions.ActionSettingsChangeAutoNightMode,
    settingsActions.ActionSettingsChangeChToken,
    settingsActions.ActionSettingsChangeChUsername,
    settingsActions.ActionSettingsChangeTg,
    (state: SettingsState = initialState, payload) => {
      return { ...initialState, ...state, ...payload };
    }
  )
);

export function settingsReducer(state: SettingsState, action: any) {
  return _settingsReducer(state, action);
}