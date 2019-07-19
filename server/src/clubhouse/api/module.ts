import { Module, HttpModule } from '@nestjs/common';
import { ClubhouseApiService } from './service';
import { ConfigModule } from '../../config';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    ConfigModule,
  ],
  providers: [ClubhouseApiService],
  exports: [ClubhouseApiService],
})
export class ClubhouseApiModule {}
