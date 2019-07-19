import { Controller, Post, Query, Body } from '@nestjs/common';
import { LoggerService } from './service';
import { LoggerInterface, LogTimeBodyInterface } from './interfaces';
import { Observable } from 'rxjs';

@Controller()
export class LoggerController {
    constructor(private readonly loggerService: LoggerService) { }

    @Post('toggle/logtime')
    getLogger(@Query('authKey') authKey: string, @Body() body: LogTimeBodyInterface): Observable<LoggerInterface[]> {
        return this.loggerService.setLog(authKey, body);
    }
}
