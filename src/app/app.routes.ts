import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: LoginComponent },
  {
    path: '',
    loadComponent: () => import('./features/sidebar-layout/sidebar-layout.component').then(m => m.SidebarLayoutComponent),
    children: [
      { path: 'admin-dashboard', loadComponent: () => import('./features/admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent) },
      { path: 'school-dashboard', loadComponent: () => import('./features/school-dashboard/school-dashboard.component').then(m => m.SchoolDashboardComponent) },
      { path: 'branch-dashboard', loadComponent: () => import('./features/branch-dashboard/branch-dashboard.component').then(m => m.BranchDashboardComponent) },
      { path: 'student-dashboard', loadComponent: () => import('./features/student-dashboard/student-dashboard.component').then(m => m.StudentDashboardComponent) },
      { path: 'parent-dashboard', loadComponent: () => import('./features/parent-dashboard/parent-dashboard.component').then(m => m.ParentDashboardComponent) },
      { path: 'instructor-dashboard', loadComponent: () => import('./features/instructor-dashboard/instructor-dashboard.component').then(m => m.InstructorDashboardComponent) },
      { path: 'schools', loadComponent: () => import('./features/school/pages/school-list/school-list.component').then(m => m.SchoolListComponent) },
      { path: 'schools/add', loadComponent: () => import('./features/school/pages/school-add/school-add.component').then(m => m.SchoolAddComponent) },
      { path: 'schools/:id', loadComponent: () => import('./features/school/pages/school-detail/school-detail.component').then(m => m.SchoolDetailComponent) },
      { path: 'branches', loadComponent: () => import('./features/branches/pages/branch-list/branch-list.component').then(m => m.BranchListComponent) },
    ]
  }
];
