import { envBase } from './environment.base';

export const environment = {
  ...envBase,
  envName: 'PROD',
  production: true,
  test: false,
};