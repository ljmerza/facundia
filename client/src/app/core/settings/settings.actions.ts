import { createAction, props } from '@ngrx/store';
import { SettingsState } from './settings.model';

export const ActionSettingsChangeSettings = createAction('[Settings] Change Settings', props<{ settings: SettingsState }>());

export const ActionSettingsChangeTheme = createAction('[Settings] Change Theme', props<{ theme: string }>());
export const ActionSettingsChangeNightTheme = createAction('[Settings] Change Night Theme', props<{ nightTheme: string }>());
export const ActionSettingsChangeAutoNightMode = createAction('[Settings] Change Auto Night Mode', props<{ autoNightMode: boolean }>());
export const ActionSettingsChangeHour = createAction('[Settings] Change Hour', props<{ hour: number }>());

export const ActionSettingsChangeChToken = createAction('[Settings] Change CH Token', props<{ chToken: string }>());
export const ActionSettingsChangeChUsername = createAction('[Settings] Change CH Username', props<{ chUsername: string }>());

export const ActionSettingsChangeTg = createAction('[Settings] Change TG', props<{ tgToken: string; tgDefaultProjectId: number }>());
