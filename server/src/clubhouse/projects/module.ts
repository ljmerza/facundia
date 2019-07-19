import { Module } from '@nestjs/common';
import { ProjectService } from './service';
import { ProjectController } from './controller';
import { ClubhouseApiModule } from '../api';

@Module({
    imports: [ClubhouseApiModule],
    controllers: [ProjectController],
    providers: [ProjectService],
    exports: [ProjectService]
})
export class ProjectModule { }
