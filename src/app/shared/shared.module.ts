import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { NoPageFoundComponent } from './no-page-found/no-page-found.component';

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    HeaderComponent,
    NoPageFoundComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [
    NavbarComponent,
    FooterComponent,
    HeaderComponent,
    NoPageFoundComponent,
  ],
})
export class SharedModule {}
