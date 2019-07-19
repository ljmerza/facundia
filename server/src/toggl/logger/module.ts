import { Module } from '@nestjs/common';
import { LoggerService } from './service';
import { LoggerController } from './controller';
import { TogglApiModule } from '../api';


@Module({
  imports: [TogglApiModule],
  controllers: [LoggerController],
  providers: [LoggerService],
  exports: [],
})
export class TogglLoggerModule {}
