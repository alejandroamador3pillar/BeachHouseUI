import { Component, OnInit } from '@angular/core';
import { ParametersService } from 'src/app/services/service.index';
import { IParameterModel } from '../../models/parameter.model';
import { SocialUser } from 'lib';
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

  constructor(private parametersService: ParametersService) { }

  ngOnInit(): void {
    this.getParameters();
    this.getUsers();
  }

  getParameters(): void {
    this.parametersService.getParameters()
      .subscribe(parameters => this.parameters = parameters);
  }

  setParameter(parameter: IParameterModel): void{

    parameter.updated_by = "101790084427153843849";//pending to add current user
    //console.log(parameter);

    this.parametersService.setParameter(parameter)
    .subscribe((data) => {
        console.log(data);
        this.openSnackBar(data);
        return true;
    },
    (error) => {      
      console.log(error);
      this.openSnackBar(error);
      this.parameter = null;
      //return of();
      return false; 
    });
  }

  openSnackBar(data: any) {
    /* this.snackBar.openFromComponent(ParametersComponent, {
      duration: this.durationInSeconds * 1000,
    }); */    
  }

  getUsers(): void {
    this.parametersService.getUsers()
      .subscribe(users => this.users = users);
  }


}
