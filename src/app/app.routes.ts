import { RouterModule, Routes } from '@angular/router';

import { NoPageFoundComponent } from './shared/no-page-found/no-page-found.component';

import { PagesComponent } from './pages/pages.component';

const appRoutes: Routes = [
  //   { path: 'login', component: LoginComponent },
  //   { path: 'register', component: RegisterComponent },
  {
    path: '',
    component: PagesComponent,
    loadChildren: () => import('./pages/pages.module').then( m => m.PagesModule),
  },
  { path: '**', component: NoPageFoundComponent },
];

export const APP_ROUTES = RouterModule.forRoot(appRoutes, { useHash: true });
