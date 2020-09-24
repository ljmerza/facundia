import { Controller, Get, Headers } from '@nestjs/common';
import { EntriesService } from './service';
import { EntriesInterface } from './interfaces';
import { Observable } from 'rxjs';

@Controller()
export class EntriesController {
	constructor(private readonly entriesService: EntriesService) {}

	@Get('toggl/entries')
	getEntries(@Headers('authorization') authKey: string): Observable<EntriesInterface[]> {
		return this.entriesService.getEntries(authKey);
	}
}
