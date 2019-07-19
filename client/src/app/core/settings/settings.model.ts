import { CoreState } from '../core.module';

export const NIGHT_MODE_THEME = 'BLACK-THEME';

export interface SettingsState {
	theme: string;
	nightTheme: string;
	autoNightMode: boolean;
	chToken: string;
	chUsername: string;
	hour: number;
}

export interface State extends CoreState {
  settings: SettingsState;
}
