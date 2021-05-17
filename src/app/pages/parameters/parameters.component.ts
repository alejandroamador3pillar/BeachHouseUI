import { Component, OnInit } from '@angular/core';
import { ParametersService } from 'src/app/services/service.index';
import { IParameterModel } from '../../models/parameter.model';
import { SocialUser } from 'lib';
import { SocialAuthService } from 'lib';
import {MatSnackBar} from '@angular/material/snack-bar';
import { of } from 'rxjs';

const USER_SCHEMA = {
  "id": "text",
  "description": "text",
  "value": "text",
  "startDate": "date",
  "endDate": "date",
  "updated_by": "text"
}

@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.css']
})
export class ParametersComponent implements OnInit {
  parameters: IParameterModel[] = [];
  parameter: IParameterModel;
  users: ParametersComponent[];
  user: SocialUser;
  displayedColumns: string[] = ['description', 'value', 'startDate', 'endDate', '$$edit'];
  durationInSeconds = 5;
  dataSchema = USER_SCHEMA;
  loading = true;
  userData: SocialUser;

  constructor(private parametersService: ParametersService, private _snackBar: MatSnackBar, private authService:SocialAuthService) { }

  ngOnInit(): void {
    this.getUserData();
    this.getParameters();
    this.getUsers();
  }

  getUserData(): void{
    this.authService.authState.subscribe(user=>{this.userData = user});
  }

  getParameters(): void {
    this.parametersService.getParameters()
      .subscribe(parameters => {this.parameters = parameters;
      this.loading = false;});
  }

  setParameter(parameter: IParameterModel): void{

    parameter.updated_by = this.userData.id;//pending to add current user
    //console.log(parameter);

    this.parametersService.setParameter(parameter)
    .subscribe((data) => {
        console.log(data);
        this.openSnackBar("Success");
        return true;
    },
    (error) => {
      console.log(error);
      this.openSnackBar(error.error);
      this.parameter = null;
      //return of();
      return false;
    });
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, "Dismiss");
    setTimeout(this._snackBar.dismiss.bind(this._snackBar),5000);
  }

  getUsers(): void {
    this.parametersService.getUsers()
      .subscribe(users => this.users = users);
  }


}
