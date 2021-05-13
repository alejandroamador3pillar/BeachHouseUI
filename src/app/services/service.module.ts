import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
// Servicios
import {

CalendarService, MessageService, ParametersService, ReserveService, RestService, UsersService } from './service.index';


@NgModule({
  imports: [CommonModule, HttpClientModule],
  declarations: [],
  providers: [
   CalendarService,
    MessageService,
    ParametersService,
    ReserveService,
    RestService,
    UsersService
  ]
})
export class ServiceModule {}
