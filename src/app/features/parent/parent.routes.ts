import { Routes } from '@angular/router';

export const PARENT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/parent-list/parent-list.component').then(m => m.ParentListComponent),
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/parent-register/parent-register.component').then(m => m.ParentRegisterComponent),
  },
  {
    path: ':id',
    loadComponent: () => import('./pages/parent-detail/parent-detail.component').then(m => m.ParentDetailComponent),
  },
];
