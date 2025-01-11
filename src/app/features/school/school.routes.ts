import { Routes } from '@angular/router';

export const SCHOOL_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/school-list/school-list.component').then(m => m.SchoolListComponent),
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/school-register/school-register.component').then(m => m.SchoolRegisterComponent),
  },
  {
    path: ':id',
    loadComponent: () => import('./pages/school-detail/school-detail.component').then(m => m.SchoolDetailComponent),
  },
];
