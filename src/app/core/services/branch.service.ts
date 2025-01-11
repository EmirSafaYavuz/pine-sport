import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BranchRegisterModel } from '../models/branch-register-model';
import { Result } from '../models/result.model';
import { Branch } from '../models/branch.model';

@Injectable({
  providedIn: 'root'
})
export class BranchService {
  private readonly apiUrl = 'https://localhost:7092/api';

  constructor(private http: HttpClient) { }

  getBranches(): Observable<Result<Branch[]>> {
    return this.http.get<Result<Branch[]>>(`${this.apiUrl}/branch`);
  }

  registerBranch(branch: BranchRegisterModel): Observable<Result<any>> {
    return this.http.post<Result<any>>(`${this.apiUrl}/branch`, branch);
  }

  getBranchById(id: number): Observable<Result<Branch>> {
    return this.http.get<Result<Branch>>(`${this.apiUrl}/branch/${id}`);
  }
}
