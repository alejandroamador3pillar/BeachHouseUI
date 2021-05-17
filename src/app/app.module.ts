import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {DatePipe} from '@angular/common';

import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './ui/material.module';
import { ModalModule } from 'ngx-bootstrap/modal';


import { SocialLoginModule, SocialAuthServiceConfig, SocialAuthService } from 'lib';
import { GoogleLoginProvider } from 'lib';

import { AppComponent } from './app.component';

import { LoginComponent } from './login/login.component';

// Services
import { ServiceModule } from './services/service.module';

// ROUTES
import { APP_ROUTES } from './app.routes';

// // Main components
import { PagesComponent } from './pages/pages.component';

// Shared
import { SharedModule } from './shared/shared.module';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [AppComponent, LoginComponent, PagesComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    SocialLoginModule,
    BrowserAnimationsModule,
    MaterialModule,
    CommonModule,
    NgbModalModule,
    ModalModule.forRoot(),
    NgIdleKeepaliveModule.forRoot(),
    APP_ROUTES,
    SharedModule,
    ServiceModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
  ],
  providers: [
    DatePipe,
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
          },
        ],
      } as SocialAuthServiceConfig,
    },
  ],
  bootstrap: [AppComponent],
  //schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class AppModule {}
