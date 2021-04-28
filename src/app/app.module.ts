import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './ui/material.module';


import { SocialLoginModule, SocialAuthServiceConfig } from 'lib';
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
    APP_ROUTES,
    SharedModule,
    ServiceModule,
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
          },
        ],
      } as SocialAuthServiceConfig,
    },
  ],
  bootstrap: [AppComponent],
  //schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class AppModule {}
