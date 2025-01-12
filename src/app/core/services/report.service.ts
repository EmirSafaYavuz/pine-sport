import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdminDashboardReport } from '../models/admin-dashboard-report.model';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private readonly apiUrl = 'https://localhost:7092/api/reports';

  constructor(private http: HttpClient) { }

  getAdminDashboardReport(): Observable<AdminDashboardReport> {
    return this.http.get<AdminDashboardReport>(`${this.apiUrl}/admin-dashboard-stats`);
  }
}
