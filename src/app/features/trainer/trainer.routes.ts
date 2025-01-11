// business.routes.ts
import { Routes } from '@angular/router';

export const TRAINER_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/trainer-list/trainer-list.component').then(m => m.TrainerListComponent),
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/trainer-register/trainer-register.component').then(m => m.TrainerRegisterComponent),
  },
  {
    path: ':id',
    loadComponent: () => import('./pages/trainer-detail/trainer-detail.component').then(m => m.TrainerDetailComponent),
  },
];
