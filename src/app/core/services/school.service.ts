import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Result } from '../models/result.model';
import { School } from '../models/school.model';
import { SchoolRegister } from '../models/school-register.model';
import { ErrorResponse } from '../models/error-response.model';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {
  private readonly apiUrl = 'https://localhost:7092/api/schools';

  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService
  ) {}

  getSchools(): Observable<School[]> {
    return this.http.get<School[]>(`${this.apiUrl}`).pipe(
      catchError(this.errorHandler.handleHttpError.bind(this.errorHandler))
    );
  }

  registerSchool(schoolData: SchoolRegister): Observable<School> {
    return this.http.post<School>(`${this.apiUrl}`, schoolData).pipe(
      catchError(this.errorHandler.handleHttpError.bind(this.errorHandler))
    );
  }

  getSchoolById(id: number): Observable<School> {
    return this.http.get<School>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.errorHandler.handleHttpError.bind(this.errorHandler))
    );
  }
}
