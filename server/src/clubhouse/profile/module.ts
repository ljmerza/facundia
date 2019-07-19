import { Module } from '@nestjs/common';
import { ProfileService } from './service';
import { ProfileController } from './controller';
import { ClubhouseApiModule } from '../api';

@Module({
    imports: [ClubhouseApiModule],
    controllers: [ProfileController],
    providers: [ProfileService],
    exports: [ProfileService]
})
export class ProfileModule { }
