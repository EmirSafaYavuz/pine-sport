import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Result } from '../models/result.model';
import { SidebarMenu } from '../models/sidebar-menu.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly apiUrl = 'https://localhost:7092/api/users';

  constructor(private http: HttpClient) { }

  getSidebarMenu(): Observable<SidebarMenu[]> {
    return this.http.get<SidebarMenu[]>(`${this.apiUrl}/menu`);
  }
}
