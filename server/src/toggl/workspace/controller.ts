import { Controller, Get, Headers } from '@nestjs/common';
import { WorkSpaceService } from './service';
import { WorkSpaceInterface } from './interfaces';
import { Observable } from 'rxjs';

@Controller()
export class WorkSpaceController {
	constructor(private readonly workSpaceService: WorkSpaceService) {}

	@Get('toggl/workspace')
	getWorkSpaces(@Headers('authorization') authKey: string): Observable<WorkSpaceInterface[]> {
		return this.workSpaceService.getWorkSpaces(authKey);
	}
}
