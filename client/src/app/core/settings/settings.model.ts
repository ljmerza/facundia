import { CoreState } from '../core.module';

export const NIGHT_MODE_THEME = 'BLACK-THEME';

export interface SettingsState {
	theme: string;
	nightTheme: string;
	autoNightMode: boolean;
	hour: number;
	chToken: string;
	chUsername: string;
	tgUsername: string;
	tgPassword: string;
}

export interface State extends CoreState {
  settings: SettingsState;
}
