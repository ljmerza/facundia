import { Module } from '@nestjs/common';
import * as path from 'path';
import { ConfigService } from './config.service';


const envFile = path.resolve(__dirname, '..', '..', 'env', `.env`);


@Module({
  providers: [
    {
      provide: ConfigService,
      useValue: new ConfigService(envFile),
    },
  ],
  exports: [ConfigService],
})
export class ConfigModule {}
