import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { AuthService, UserRole } from '../../services/auth.service';

interface BreadcrumbItem {
  label: string;
  url: string;
}

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.css'
})
export class BreadcrumbComponent implements OnInit {
  breadcrumbs: BreadcrumbItem[] = [];

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.generateBreadcrumbs();
    });
  }

  private generateBreadcrumbs() {
    const paths = this.router.url.split('/').filter(path => path);
    this.breadcrumbs = [];

    // Always add home
    this.breadcrumbs.push({ label: 'Ana Sayfa', url: '/' });

    // Build the rest of the breadcrumbs
    let url = '';
    paths.forEach(path => {
      url += `/${path}`;
      this.breadcrumbs.push({
        label: this.formatLabel(path),
        url: url
      });
    });
  }

  private formatLabel(path: string): string {
    // Convert URL segments to readable labels
    const labels: { [key: string]: string } = {
      'schools': 'Okullar',
      'branches': 'Şubeler',
      'add': 'Ekle',
      'admin-dashboard': 'Admin Paneli',
      'school-dashboard': 'Okul Paneli',
      // Add more mappings as needed
    };

    return labels[path] || path;
  }

  navigateToHome() {
    const role = this.authService.getCurrentUserRole();
    const dashboardRoute = this.getDashboardRouteByRole(role);
    this.router.navigate([dashboardRoute]);
  }

  private getDashboardRouteByRole(role: UserRole): string {
    const dashboardRoutes = {
      admin: '/admin-dashboard',
      school: '/school-dashboard',
      branch: '/branch-dashboard',
      student: '/student-dashboard',
      parent: '/parent-dashboard',
      instructor: '/instructor-dashboard'
    };
    return dashboardRoutes[role];
  }
}
