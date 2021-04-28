import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/service.index';
import { IUserModel } from '../../models/user.model';
import { SocialUser } from 'lib';
import {MatSnackBar} from '@angular/material/snack-bar';
import { of } from 'rxjs';

const USER_SCHEMA = {
  "id": "text",
  "role": "int",
  "active": "int",
  "email": "text",
  "firstName": "text",
  "lastName": "text",
  "phone": "text" 
}




@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {
  users: IUserModel[] = [];
  user:  IUserModel;
  displayedColumns: string[] = ['id','lastName','firstName', 'role', 'active', 'email','phone', '$$edit'];
  durationInSeconds = 5;
  dataSchema = USER_SCHEMA;
 
  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  
  getUsers(): void {
    //user.id='112233445566';
    this.usersService.getUsers()
      .subscribe(users => this.users = users);
      console.log(this.users);
  }

  setUser(user: IUserModel): void{

   

    this.usersService.setUsers(user)
    .subscribe((data) => {
        console.log(data);
        this.openSnackBar(data);
        return true;
    },
    (error) => {      
      console.log(error);
      this.openSnackBar(error);
      this.user = null;
      //return of();
      return false; 
    });
  }

  openSnackBar(data: any) {
    /* this.snackBar.openFromComponent(ParametersComponent, {
      duration: this.durationInSeconds * 1000,
    }); */    
  }
}

//----------------------------------------

  



