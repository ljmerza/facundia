import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import {
  ClubhouseModule
} from './clubhouse/clubhouse.module';

import {
  TogglModule
} from './toggl/toggle.module';

import { ConfigModule } from './config';


@Module({
  imports: [
    ConfigModule,
    ClubhouseModule,
    TogglModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
