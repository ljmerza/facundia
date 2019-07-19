import { Controller, Get } from '@nestjs/common';
import { ProfileService } from './service';
import { MemberInterface } from './interface';
import { Observable } from 'rxjs';

@Controller()
export class ProfileController {
    constructor(private readonly profileService: ProfileService) { }

    @Get('profiles')
    getProfile(): Observable<MemberInterface[]> {
        return this.profileService.getProfiles();
    }
}
