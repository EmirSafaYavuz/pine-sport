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
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {
  breadcrumbs: BreadcrumbItem[] = [];

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // Generate breadcrumbs on initial load
    this.generateBreadcrumbs();

    // Listen to navigation events and regenerate breadcrumbs
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.generateBreadcrumbs();
    });
  }

  private generateBreadcrumbs() {
    const paths = this.router.url.split('/').filter(path => path);
    this.breadcrumbs = [];

    // Ana sayfada sadece "Ana Sayfa" göster
    if (this.isHomePage(paths)) {
      this.breadcrumbs.push({ label: 'Ana Sayfa', url: '/' });
      return;
    }

    // Build breadcrumbs
    let url = '';
    paths.forEach((path, index) => {
      url += `/${path}`;

      // Dashboard ve alt sayfaları için özel kontrol
      if (path === 'dashboard' && paths[index + 1]) {
        return; // Dashboard kelimesini atla
      }

      this.breadcrumbs.push({
        label: this.formatLabel(path),
        url: url
      });
    });
  }

  private isHomePage(paths: string[]): boolean {
    if (paths.length === 2 && paths[0] === 'dashboard') {
      const secondPath = paths[1];
      return ['admin', 'school', 'branch', 'student', 'parent', 'trainer'].includes(secondPath);
    }
    return false;
  }

  private formatLabel(path: string): string {
    const labels: { [key: string]: string } = {
      // Dashboard routes
      'dashboard': 'Panel',
      'admin': 'Admin Paneli',
      'school': 'Okul Paneli',
      'branch': 'Şube Paneli',
      'student': 'Öğrenci Paneli',
      'parent': 'Veli Paneli',
      'trainer': 'Eğitmen Paneli',

      // Main routes
      'schools': 'Okullar',
      'branches': 'Şubeler',
      'students': 'Öğrenciler',
      'parents': 'Veliler',
      'trainers': 'Eğitmenler',

      // Common actions
      'register': 'Kayıt',
      'detail': 'Detay',
    };

    return labels[path] || this.capitalizeFirstLetter(path);
  }

  private capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  navigateToHome() {
    const role = this.authService.getCurrentUserRole();
    if (role) {
        const dashboardRoute = this.getDashboardRouteByRole(role);
        this.router.navigate([dashboardRoute]);
    } else {
        this.router.navigate(['/']); // Rol yoksa ana sayfaya yönlendir
    }
  }

  private getDashboardRouteByRole(role: UserRole): string {
    const dashboardRoutes: { [key: string]: string } = {
      admin: '/dashboard/admin',
      school: '/dashboard/school',
      branch: '/dashboard/branch',
      student: '/dashboard/student',
      parent: '/dashboard/parent',
      trainer: '/dashboard/trainer'
    };
    return dashboardRoutes[role] || '/';
  }
}
