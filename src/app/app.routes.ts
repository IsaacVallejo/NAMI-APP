import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'local-support',
    loadComponent: () => import('./local-support/local-support.page').then( m => m.LocalSupportPage)
  },  {
    path: 'resources',
    loadComponent: () => import('./resources/resources.page').then( m => m.ResourcesPage)
  },

];
