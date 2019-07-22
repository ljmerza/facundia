import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import {
  ClubhouseModule
} from './clubhouse/clubhouse.module';

import {
  TogglModule
} from './toggl/toggle.module';

import { ConfigModule } from './config';
import { HttpExceptionFilter } from './http-exception.filter';


@Module({
  imports: [
    ConfigModule,
    ClubhouseModule,
    TogglModule,
  ],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
  controllers: [AppController],
})
export class AppModule {}
