import { Module } from '@nestjs/common';
import { ClientsService } from './service';
import { ClientsController } from './controller';
import { TogglApiModule } from '../api';


@Module({
  imports: [TogglApiModule],
  controllers: [ClientsController],
  providers: [ClientsService],
  exports: [],
})
export class TogglClientsModule {}
