import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { WorkflowInterface } from './interfaces';
import { ClubhouseApiService } from '../api';

@Injectable()
export class WorkflowService {
  constructor(private readonly apiService: ClubhouseApiService) {}

  getWorkflows(): Observable<WorkflowInterface[]> {
    return this.apiService.getData('workflows').pipe(map(response => response.data));
  }
}
