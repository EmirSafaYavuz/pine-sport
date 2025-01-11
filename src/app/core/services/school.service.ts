import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Result } from '../models/result.model';
import { School } from '../models/school.model';
import { SchoolRegister } from '../models/school-register.model';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {
  private readonly apiUrl = 'https://localhost:7092/api';

  constructor(private http: HttpClient) { }

  getSchools(): Observable<School[]> {
    return this.http.get<School[]>(`${this.apiUrl}/school`);
  }

  register(schoolData: SchoolRegister): Observable<Result<any>> {
    return this.http.post<Result<any>>(`${this.apiUrl}/school/register`, schoolData);
  }

  getSchoolById(id: number): Observable<School> {
    return this.http.get<School>(`${this.apiUrl}/school/${id}`);
  }
}
