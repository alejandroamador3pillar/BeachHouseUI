import { RouterModule, Routes } from '@angular/router';

import { ParametersComponent } from './parameters/parameters.component';
import { ReserveComponent } from './reserve/reserve.component';
import { AccountComponent } from './account/account.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { UsersComponent } from './users/users.component';
import { SeasonsComponent } from './seasons/seasons.component';
import { LoginComponent } from '../login/login.component';


const pagesRoutes: Routes = [
  { path: 'account', component: AccountComponent },
  { path: 'myreservations', component: ReservationsComponent },
  { path: 'reserve', component: ReserveComponent },
  { path: 'parameters', component: ParametersComponent },
  { path: 'users', component: UsersComponent },
  { path: 'login', component: LoginComponent },
  { path: 'seasons', component: SeasonsComponent },
  { path: '', redirectTo: '/reserve', pathMatch: 'full' },
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
