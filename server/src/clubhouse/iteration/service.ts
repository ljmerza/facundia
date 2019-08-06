import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IterationInterface } from './interfaces';
import { ClubhouseApiService } from '../api';

@Injectable()
export class IterationService {
  constructor(private readonly apiService: ClubhouseApiService) {}

  getIterations(): Observable<IterationInterface[]> {
    return this.apiService.getData('iterations').pipe(map(response => response.data));
  }
}
