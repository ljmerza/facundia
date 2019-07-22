import { createSelector } from '@ngrx/store';

import { SettingsState } from './settings.model';
import { selectSettingsState } from '../core.state';

export const selectSettings = createSelector(
  selectSettingsState,
  (state: SettingsState) => state
);

export const selectAutoNightMode = createSelector(
  selectSettings,
  (state: SettingsState) => state && state.autoNightMode
);
export const selectHour = createSelector(
  selectSettings,
  (state: SettingsState) => state && state.hour
);
export const selectIsNightHour = createSelector(
  selectAutoNightMode,
  selectHour,
  (autoNightMode, hour) => autoNightMode && (hour >= 21 || hour <= 7)
);

export const selectTheme = createSelector(
  selectSettings,
  (state: SettingsState) => state && state.theme
);
export const selectNightTheme = createSelector(
  selectSettings,
  (state: SettingsState) => state && state.nightTheme
);
export const selectEffectiveTheme = createSelector(
  selectTheme,
  selectNightTheme,
  selectIsNightHour,
  (theme, nightTheme, isNightHour) =>
    (isNightHour ? nightTheme : theme || '').toLowerCase()
);

export const selectChUsername = createSelector(
  selectSettings,
  (state: SettingsState) => state && state.chUsername
);
export const selectChToken = createSelector(
  selectSettings,
  (state: SettingsState) => state && state.chToken
);

export const selectTgUsername = createSelector(
  selectSettings,
  (state: SettingsState) => state && state.tgUsername
);
export const selectTgPassword = createSelector(
  selectSettings,
  (state: SettingsState) => state && state.tgPassword
);

export const selectTgDefaultClientId = createSelector(
  selectSettings,
  (state: SettingsState) => state && state.tgDefaultClientId
);
