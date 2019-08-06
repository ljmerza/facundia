import { Controller, Get, Query } from '@nestjs/common';
import { EntriesService } from './service';
import { EntriesInterface } from './interfaces';
import { Observable } from 'rxjs';

@Controller()
export class EntriesController {
    constructor(private readonly entriesService: EntriesService) { }

    @Get('toggle/entries')
    getEntries(@Query('authKey') authKey: string): Observable<EntriesInterface[]> {
        return this.entriesService.getEntries(authKey);
    }
}
