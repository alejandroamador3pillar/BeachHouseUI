import { Component, OnInit } from '@angular/core';
import { ReserveService } from 'src/app/services/service.index';

@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.css']
})
export class ReserveComponent implements OnInit {

  reservations: ReserveComponent[] = [];

  constructor(private reservationsService: ReserveService) { }

  ngOnInit(): void {
    //this.getReservations();
  }

  getReservations(): void {
    this.reservationsService.getReservations()
      .subscribe(reservations => this.reservations = reservations);
  }

  

}
