import { Module } from '@nestjs/common';
import { StandUpController } from './controller';
import { ProfileModule } from '../profile';
import { ProjectModule } from '../projects';
import { WorkflowModule } from '../workflow';
import { LabelModule } from '../label';

@Module({
	imports: [ProfileModule, ProjectModule, WorkflowModule, LabelModule],
	controllers: [StandUpController],
})
export class StandUpModule {}
