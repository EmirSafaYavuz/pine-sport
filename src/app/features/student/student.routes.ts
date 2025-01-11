import { Routes } from '@angular/router';

export const STUDENT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/student-list/student-list.component').then(m => m.StudentListComponent),
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/student-register/student-register.component').then(m => m.StudentRegisterComponent),
  },
  {
    path: ':id',
    loadComponent: () => import('./pages/student-detail/student-detail.component').then(m => m.StudentDetailComponent),
  },
];
