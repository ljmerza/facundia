import { Module } from '@nestjs/common';
import { ProjectsService } from './service';
import { ProjectsController } from './controller';
import { TogglApiModule } from '../api';


@Module({
  imports: [TogglApiModule],
  controllers: [ProjectsController],
  providers: [ProjectsService],
  exports: [],
})
export class TogglProjectsModule {}
