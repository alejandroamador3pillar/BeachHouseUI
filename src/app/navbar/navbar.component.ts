import { Component, OnInit } from '@angular/core';
import { AccountComponent } from '../account/account.component';
import { ReservationsComponent } from '../reservations/reservations.component';
import { RouterModule, Routes } from '@angular/router';
import { ReserveComponent } from '../reserve/reserve.component';


const routes: Routes = [
  { path: 'account', component: AccountComponent },
  { path: 'myreservations', component: ReservationsComponent },
  { path: 'reserve', component: ReserveComponent }
];



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
