import { Component, OnInit } from '@angular/core';
import {ParametersService} from './parameters.service';

import { SocialUser } from 'lib';

@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.css']
})
export class ParametersComponent implements OnInit {
  parameters: ParametersComponent[] = [];
  users: ParametersComponent[];
  user: SocialUser;

  constructor(private parametersService: ParametersService) { }

  ngOnInit(): void {
    this.getParameters();
    this.getUsers();
  }

  getParameters(): void {
    this.parametersService.getParameters()
      .subscribe(parameters => this.parameters = parameters);
  }

  getUsers(): void {
    this.parametersService.getUsers()
      .subscribe(users => this.users = users);
  }

}
