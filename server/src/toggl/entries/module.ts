import { Module } from '@nestjs/common';
import { EntriesService } from './service';
import { EntriesController } from './controller';
import { TogglApiModule } from '../api';


@Module({
  imports: [TogglApiModule],
  controllers: [EntriesController],
  providers: [EntriesService],
  exports: [],
})
export class TogglEntriesModule {}
