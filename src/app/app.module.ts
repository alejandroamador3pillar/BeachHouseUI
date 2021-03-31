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
//import {MatButtonModule, MatCheckboxModule} from '@angular/material';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';

import { SocialLoginModule, SocialAuthServiceConfig } from 'lib';
import {
  GoogleLoginProvider,
  
} from 'lib';
import { ParametersComponent } from './parameters/parameters.component';

import { FooterComponent } from './footer/footer.component';
import { ReserveComponent } from './reserve/reserve.component';
import { CalendarComponent } from './calendar/calendar.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [AppComponent, NavbarComponent, LoginComponent, ParametersComponent, FooterComponent, ReserveComponent, CalendarComponent, HeaderComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule, SocialLoginModule, BrowserAnimationsModule,
    CommonModule, NgbModalModule, FlatpickrModule.forRoot(), 
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }), NgbModule,],
  exports: [CalendarComponent],
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
})
export class AppModule { }
