import { Component, OnInit } from '@angular/core';
import { SocialAuthService } from 'lib';
import { ReserveService } from 'src/app/services/service.index';

@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.css']
})
export class ReserveComponent implements OnInit {

  reservations: ReserveComponent[] = [];
  userData: any;

  constructor(private reservationsService: ReserveService, private authService:SocialAuthService) { }

  ngOnInit(): void {
    //this.getReservations();
    this.getUserData();
  }

  getUserData(): void{
    this.authService.authState.subscribe(user=>{this.userData = user});
  }

  getReservations(): void {
    this.reservationsService.getReservations()
      .subscribe(reservations => this.reservations = reservations);
  }



}
