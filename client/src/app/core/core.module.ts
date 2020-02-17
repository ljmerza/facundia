import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf, ErrorHandler } from '@angular/core';
import {
  HttpClientModule,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import {
  StoreRouterConnectingModule,
  RouterStateSerializer
} from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from '../../environments/environment';

import {
  CoreState,
  reducers,
  metaReducers,
  selectRouterState
} from './core.state';

import { CustomSerializer } from './router/custom-serializer';

import { TitleService } from './title/title.service';
import { AppErrorHandler } from './error-handler/app-error-handler.service';
import { LocalStorageService } from './local-storage/local-storage.service';
import { NotificationService } from './notifications/notification.service';
import { AnimationsService } from './animations/animations.service';

import { HttpErrorInterceptor } from './http-interceptors/http-error.interceptor';
import { APIInterceptor } from './http-interceptors/api.interceptor';

import { SettingsEffects } from './settings/settings.effects';
import { selectEffectiveTheme } from './settings/settings.selectors';


import {
  ROUTE_ANIMATIONS_ELEMENTS,
  routeAnimations
} from './animations/route.animations';

export * from './settings';

export {
  TitleService,
  CoreState,
  LocalStorageService,

  selectRouterState,
  NotificationService,
  AnimationsService,
  selectEffectiveTheme,
  routeAnimations,
  ROUTE_ANIMATIONS_ELEMENTS,
};

@NgModule({
  imports: [
    // angular
    CommonModule,
    HttpClientModule,

    // ngrx
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreRouterConnectingModule.forRoot(),
    EffectsModule.forRoot([
      SettingsEffects,
    ]),
    environment.production
      ? []
      : StoreDevtoolsModule.instrument({
        name: 'Facundia'
      }),
  ],
  declarations: [],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: APIInterceptor, multi: true },
    { provide: ErrorHandler, useClass: AppErrorHandler },
    { provide: RouterStateSerializer, useClass: CustomSerializer }
  ],
  exports: []
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
  }
}
