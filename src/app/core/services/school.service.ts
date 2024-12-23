import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Result } from '../models/result.model';
import { School } from '../models/school.model';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {
  private readonly apiUrl = 'https://localhost:7092/api';

  constructor(private http: HttpClient) { }

  getSchools(): Observable<Result<School[]>> {
    return this.http.get<Result<School[]>>(`${this.apiUrl}/school`);
  }
}
