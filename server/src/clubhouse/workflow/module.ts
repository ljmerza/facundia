import { Module } from '@nestjs/common';
import { WorkflowService } from './service';
import { ClubhouseApiModule } from '../api';

@Module({
  imports: [ClubhouseApiModule],
  controllers: [],
  providers: [WorkflowService],
  exports: [WorkflowService],
})
export class WorkflowModule {}
