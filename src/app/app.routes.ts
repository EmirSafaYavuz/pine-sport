import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: LoginComponent },
  {
    path: '',
    loadComponent: () => import('./features/sidebar-layout/sidebar-layout.component').then(m => m.SidebarLayoutComponent),
    children: [
      { path: 'dashboard', loadChildren: () => import('./features/dashboard/dashboard.routes').then(m => m.DASHBOARD_ROUTES) },
      { path: 'schools', loadChildren: () => import('./features/school/school.routes').then(m => m.SCHOOL_ROUTES) },
      { path: 'branches', loadChildren: () => import('./features/branch/branch.routes').then(m => m.BRANCH_ROUTES) },
      { path: 'trainers', loadChildren: () => import('./features/trainer/trainer.routes').then(m => m.TRAINER_ROUTES) },
      { path: 'students', loadChildren: () => import('./features/student/student.routes').then(m => m.STUDENT_ROUTES) },
      { path: 'parents', loadChildren: () => import('./features/parent/parent.routes').then(m => m.PARENT_ROUTES) },
    ]
  }
];
