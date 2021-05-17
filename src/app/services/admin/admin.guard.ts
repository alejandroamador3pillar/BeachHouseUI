import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { SocialAuthService } from 'lib';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UsersService } from '../users/users.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  userId: string;
  constructor(private usersService: UsersService, private authService:SocialAuthService, private router:Router){
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isAdmin();
  }

  getData(){
    this.authService.authState.subscribe(user => {
      this.userId = user.id;
      sessionStorage.setItem("userId",user.id);
    });
  }

  isAdmin(){
    this.getData();
    return this.usersService.isAdmin(sessionStorage.getItem("userId")).pipe(
      map(valid => {
        if(valid==200){
          return true;
        }else{
          this.router.navigate(['../unauthorized']);
          return false;
        }

      }, error => {
        this.router.navigate(['../unauthorized']);
        return false;
      })
    )


  }
}
