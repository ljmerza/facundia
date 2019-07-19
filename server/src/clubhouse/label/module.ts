import { Module } from '@nestjs/common';
import { LabelService } from './service';
import { ClubhouseApiModule } from '../api';

@Module({
  imports: [ClubhouseApiModule],
  controllers: [],
  providers: [LabelService],
  exports: [LabelService],
})
export class LabelModule {}
