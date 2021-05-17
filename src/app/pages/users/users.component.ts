import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from 'src/app/services/service.index';
import { IUserModel } from '../../models/user.model';
import {SocialUser } from 'lib';
import { SocialAuthService } from 'lib';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { of } from 'rxjs';

const USER_SCHEMA = {
  "id": "text",
  "role": "number",
  "active": "boolean",
  "email": "text",
  "firstName": "text",
  "lastName": "text",
  "phone": "number"
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
  dataSource = new MatTableDataSource<IUserModel>();
  loading = true;
  userData: SocialUser;

  constructor(private usersService: UsersService, private _snackBar: MatSnackBar, private authService:SocialAuthService) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData(): void{
    this.authService.authState.subscribe(user=>{
      this.userData = user;
      this.getUsers();
    });
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, "Dismiss");
    setTimeout(this._snackBar.dismiss.bind(this._snackBar),5000)
  }

  getUsers(): void {
    this.usersService.getUsers(this.userData.id)
      .subscribe(users => {this.users = users;
      this.loading = false;
      this.dataSource=new MatTableDataSource<IUserModel>(this.users);
      this.dataSource.paginator = this.paginator;});
      console.log(this.users);
  }

  setUser(user: IUserModel): void{
    user.phone=Number(user.phone);
    console.log(user);
    this.usersService.setUsers(user,this.userData.id)
    .subscribe((data) => {
        console.log(data);
        this.openSnackBar("Success");
        return true;
    },
    (error) => {
      console.log(error);
      this.openSnackBar(error.error);
      this.user = null;
      //return of();
      return false;
    });
  }

}

//----------------------------------------





