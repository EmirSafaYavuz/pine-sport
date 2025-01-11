// business.routes.ts
import { Routes } from '@angular/router';
import { BranchListComponent } from './pages/branch-list/branch-list.component';

export const BRANCH_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/branch-list/branch-list.component').then(m => m.BranchListComponent),
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/branch-register/branch-register.component').then(m => m.BranchRegisterComponent),
  },
  {
    path: ':id',
    loadComponent: () => import('./pages/branch-detail/branch-detail.component').then(m => m.BranchDetailComponent),
  },
];
