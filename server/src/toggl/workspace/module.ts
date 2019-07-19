import { Module } from '@nestjs/common';
import { WorkSpaceService } from './service';
import { WorkSpaceController } from './controller';
import { TogglApiModule } from '../api';


@Module({
  imports: [TogglApiModule],
  controllers: [WorkSpaceController],
  providers: [WorkSpaceService],
  exports: [],
})
export class TogglWorkSpaceModule {}
