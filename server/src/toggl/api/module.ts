import { Module, HttpModule } from '@nestjs/common';
import { TogglApiService } from './service';
import { ConfigModule } from '../../config';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    ConfigModule,
  ],
  providers: [TogglApiService],
  exports: [TogglApiService],
})
export class TogglApiModule {}
