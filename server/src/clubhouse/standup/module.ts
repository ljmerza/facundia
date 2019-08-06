import { Module } from '@nestjs/common';
import { StandUpController } from './controller';
import { ProfileModule } from '../profile';
import { ProjectModule } from '../projects';
import { WorkflowModule } from '../workflow';
import { LabelModule } from '../label';
import { IterationModule } from '../iteration';

@Module({
	imports: [ProfileModule, ProjectModule, WorkflowModule, LabelModule, IterationModule],
	controllers: [StandUpController],
})
export class StandUpModule {}
