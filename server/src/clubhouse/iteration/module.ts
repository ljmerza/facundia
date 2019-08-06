import { Module } from '@nestjs/common';
import { IterationService } from './service';
import { ClubhouseApiModule } from '../api';

@Module({
  imports: [ClubhouseApiModule],
  controllers: [],
  providers: [IterationService],
  exports: [IterationService],
})
export class IterationModule {}
