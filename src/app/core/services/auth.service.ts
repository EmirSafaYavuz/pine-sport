import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoginModel } from '../models/login.model';
import { LoginResponse } from '../models/login-response.model';
import { Result } from '../models/result.model';

export type UserRole = 'admin' | 'school' | 'branch' | 'student' | 'parent' | 'instructor';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = 'https://localhost:7092/api';
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_DATA_KEY = 'user_data';

  constructor(private http: HttpClient) { }

  login(loginData: LoginModel): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, loginData)
      .pipe(
        tap(response => {
            this.setToken(response.token);
            this.setUserData(response);
        })
      );
  }

  private setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  private setUserData(userData: LoginResponse): void {
    localStorage.setItem(this.USER_DATA_KEY, JSON.stringify(userData));
  }

  getUserData(): LoginResponse | null {
    const userData = localStorage.getItem(this.USER_DATA_KEY);
    return userData ? JSON.parse(userData) : null;
  }

  getCurrentUserRole(): UserRole {
    // This should be implemented based on your authentication logic
    // For now, returning a mock value
    return localStorage.getItem('userRole') as UserRole || 'admin';
  }
}
