import { Component, OnInit } from '@angular/core';
import {ParametersService} from './parameters.service';

@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.css']
})
export class ParametersComponent implements OnInit {
  parameters: ParametersComponent[] = [];
  users: ParametersComponent[] = [];

  constructor(private parametersService: ParametersService) { }

  ngOnInit(): void {
    this.getParameters();
    this.getUsers();
  }

  getParameters(): void {
    //this.parameters[] = this.parametersService.getParameters();
  }

  getUsers(): void {
    //this.users[] = this.parametersService.getUsers();
  }

}
