import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'causes',
    loadComponent: () =>
      import('./pages/causes/causes.component').then(m => m.CausesComponent)
  },
  {
    path: 'causes/:id',
    loadComponent: () =>
      import('./pages/cause-details/cause-details.component').then(m => m.CauseDetailsComponent)
  },
  {
    path: 'donate',
    loadComponent: () =>
      import('./pages/donate/donate.component').then(m => m.DonateComponent)
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./pages/about/about.component').then(m => m.AboutComponent)
  }
];
