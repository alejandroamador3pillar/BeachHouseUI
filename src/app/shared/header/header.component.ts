import { Component, OnInit } from '@angular/core';
import { SocialAuthService, SocialUser } from 'lib';
import { UsersService } from 'src/app/services/service.index';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user:SocialUser;
  admin= false;
  constructor(private authService:SocialAuthService, private usersService: UsersService) { }
  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.isAdmin();
    });

  }
  isAdmin(): void{
    this.authService.authState.subscribe(user=>{
      this.usersService.isAdmin(user.id).subscribe(valid => {
        if(valid==200){
          this.admin = true;
        }else{
          this.admin = false;
        }
      },
      error =>{this.admin=false; console.log(error.error)})
    });
  }
  signOut(): void {
    this.authService.signOut();
    window.location.reload();
  }

}
