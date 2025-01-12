import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoginModel } from '../models/login.model';
import { LoginResponse } from '../models/login-response.model';
import { Result } from '../models/result.model';
import { Profile } from '../models/profile.model';

export type UserRole = 'admin' | 'school' | 'branch' | 'student' | 'parent' | 'instructor';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = 'https://localhost:7092/api/auth';
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_DATA_KEY = 'user_data';

  constructor(private http: HttpClient) { }

  login(loginData: LoginModel): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, loginData)
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

  getProfile(): Observable<Profile> {
    return this.http.get<Profile>(`${this.apiUrl}/profile`);
  }

  getCurrentUserRole(): UserRole | null {
    const userData = localStorage.getItem(this.USER_DATA_KEY);
    if (userData) {
      const parsed = JSON.parse(userData);
      return parsed.role as UserRole;
    }
    return null;
  }
}
