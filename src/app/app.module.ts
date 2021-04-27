import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './ui/material.module';
import { RouterModule, Routes } from '@angular/router';

import { SocialLoginModule, SocialAuthServiceConfig } from 'lib';
import { GoogleLoginProvider} from 'lib';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { ParametersComponent } from './parameters/parameters.component';
import { FooterComponent } from './footer/footer.component';
import { ReserveComponent } from './reserve/reserve.component';
import { CalendarComponent, DialogData } from './calendar/calendar.component';
import { HeaderComponent } from './header/header.component';
import { AccountComponent } from './account/account.component';
import { ReservationsComponent } from './reservations/reservations.component';

const routes: Routes = [
  { path: 'account', component: AccountComponent },
  { path: 'myreservations', component: ReservationsComponent },
  { path: 'reserve', component: ReserveComponent },
  { path: 'parameters', component: ParametersComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  declarations: [AppComponent, NavbarComponent, LoginComponent, ParametersComponent, FooterComponent, ReserveComponent,
     CalendarComponent, HeaderComponent, DialogData, ],
  imports: [BrowserModule, FormsModule, HttpClientModule, SocialLoginModule, BrowserAnimationsModule, MaterialModule,
    CommonModule, NgbModalModule, FlatpickrModule.forRoot(), 
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }), NgbModule,RouterModule.forRoot(routes), ],
  exports: [CalendarComponent],
  entryComponents: [
    DialogData
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: true,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '428648805208-5fsd1d9lq8he4p80ujcc2m5eri1vi1e0.apps.googleusercontent.com'
            ),
          }
        ],
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent],
  //schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class AppModule { }
