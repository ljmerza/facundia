import { Controller, Get, Query } from '@nestjs/common';
import { LoggerService } from './service';
import { LoggerInterface } from './interfaces';
import { Observable } from 'rxjs';

@Controller()
export class LoggerController {
    constructor(private readonly loggerService: LoggerService) { }

    @Get('toggle/logger')
    getLogger(@Query('authKey') authKey): Observable<LoggerInterface[]> {
        return this.loggerService.getLogger(authKey);
    }
}
