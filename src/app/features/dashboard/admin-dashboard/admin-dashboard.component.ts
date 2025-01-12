import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportService } from '../../../core/services/report.service';
import { AdminDashboardReport } from '../../../core/models/admin-dashboard-report.model';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {
  dashboardData?: AdminDashboardReport;

  constructor(private reportService: ReportService) {}

  ngOnInit() {
    this.loadDashboardData();
  }

  private loadDashboardData() {
    this.reportService.getAdminDashboardReport().subscribe(
      data => this.dashboardData = data
    );
  }
}
