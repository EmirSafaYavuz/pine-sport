import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BranchRegisterModel } from '../models/branch-register-model';
import { Result } from '../models/result.model';
import { Branch } from '../models/branch.model';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class BranchService {
  private readonly apiUrl = 'https://localhost:7092/api/branches';

  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService
  ) { }

  getBranches(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`).pipe(
      catchError(this.errorHandler.handleHttpError.bind(this.errorHandler))
    );
  }

  registerBranch(branch: BranchRegisterModel): Observable<Branch> {
    return this.http.post<Branch>(`${this.apiUrl}`, branch).pipe(
      catchError(this.errorHandler.handleHttpError.bind(this.errorHandler))
    );
  }

  getBranchById(id: number): Observable<Branch> {
    return this.http.get<Branch>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.errorHandler.handleHttpError.bind(this.errorHandler))
    );
  }
}
