import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DemoComponent } from './demo/demo.component';

import { SocialLoginModule, SocialAuthServiceConfig } from 'lib';
import {
  GoogleLoginProvider,
  
} from 'lib';
import { ParametersComponent } from './parameters/parameters.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './footer/footer.component';
import { ReserveComponent } from './reserve/reserve.component';

@NgModule({
  declarations: [AppComponent, NavbarComponent, DemoComponent, ParametersComponent, FooterComponent, ReserveComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule, SocialLoginModule, BrowserAnimationsModule],
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
