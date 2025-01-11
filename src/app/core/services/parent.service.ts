import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParentService {
  private readonly apiUrl = 'https://localhost:7092/api';

  constructor(private http: HttpClient) { }

  getParents(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/parent`);
  }

  getParentById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/parent/${id}`);
  }

  registerParent(parentData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/parent/register`, parentData);
  }
}
