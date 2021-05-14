import { NgModule } from '@angular/core';

// ROUTES
import { PAGES_ROUTES } from './pages.routes';

// MODULES
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../ui/material.module';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';


// FACTORYES
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { ParametersComponent } from './parameters/parameters.component';
import { ReserveComponent } from './reserve/reserve.component';
import { AccountComponent } from './account/account.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { UsersComponent } from './users/users.component';
import { CalendarComponent, DialogData } from './calendar/calendar.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    ParametersComponent,
    ReserveComponent,
    AccountComponent,
    ReservationsComponent,
    UsersComponent,
    CalendarComponent,
    DialogData,
  ],
  exports: [CalendarComponent],
  entryComponents: [DialogData],
  imports: [
    CommonModule,
    SharedModule,
    PAGES_ROUTES,
    FormsModule,
    MatSnackBarModule,
    MaterialModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
})
export class PagesModule {}
