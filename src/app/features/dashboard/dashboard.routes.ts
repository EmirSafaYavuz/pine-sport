import { Routes } from '@angular/router';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: 'admin',
        loadComponent: () => import('./admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent)
      },
      {
        path: 'school',
        loadComponent: () => import('./school-dashboard/school-dashboard.component').then(m => m.SchoolDashboardComponent)
      },
      {
        path: 'branch',
        loadComponent: () => import('./branch-dashboard/branch-dashboard.component').then(m => m.BranchDashboardComponent)
      },
      {
        path: 'student',
        loadComponent: () => import('./student-dashboard/student-dashboard.component').then(m => m.StudentDashboardComponent)
      },
      {
        path: 'parent',
        loadComponent: () => import('./parent-dashboard/parent-dashboard.component').then(m => m.ParentDashboardComponent)
      },
      {
        path: 'trainer',
        loadComponent: () => import('./trainer-dashboard/trainer-dashboard.component').then(m => m.TrainerDashboardComponent)
      }
    ]
  }
];
