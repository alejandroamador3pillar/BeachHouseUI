import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ParametersService } from 'src/app/services/service.index';
import { IParameterModel } from '../../models/parameter.model';
import { ReserveService } from 'src/app/services/service.index';
import { SocialUser } from 'lib';

const USER_SCHEMA = {
  "id": "text",
  "description": "text",
  "value": "text",
  "date": "date",
  "endDate": "date",
  "updated_by": "text"
}

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements AfterViewInit {
  parameters: IParameterModel[] = [];
  parameter: IParameterModel;
  durationInSeconds = 5;
  userReservations: any[]=[];
  dataSource = new MatTableDataSource<any>(this.userReservations);
  loading = true;
  displayedColumns: string[] = ['date', '$$delete'];
  dataSchema = USER_SCHEMA;
  userData: SocialUser;

  constructor(private parametersService: ParametersService, private reservationService: ReserveService) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.getParameters();
    this.getReservationsByUser();
  }

  getParameters(): void {
    this.parametersService.getParameters()
      .subscribe(parameters => {this.parameters = parameters;
      this.loading = false;});
  }

  getReservationsByUser(): void {
    this.reservationService.getReservationsByUser(this.userData.id)
      .subscribe(userReservations => {this.userReservations = userReservations;
      this.loading = false;});
  }

  cancelReservation(user_id: number, res_id: number){
    this.reservationService.cancelReservation(user_id, res_id)
    .subscribe();

  }

}
