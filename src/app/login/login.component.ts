import { Component, OnInit, ViewChild } from '@angular/core';
import { SocialAuthService } from 'lib';
import { SocialUser } from 'lib';
import { ParametersService } from 'src/app/services/service.index';
import { GoogleLoginProvider } from 'lib';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  providers: [ParametersService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user: SocialUser;
  GoogleLoginProvider = GoogleLoginProvider;

  constructor(
    private authService: SocialAuthService,
    private parametersService: ParametersService,
    private ruta: Router
  ) {

  }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      sessionStorage.setItem("img", user.photoUrl);
    });

  }

  async signInWithGoogle(): Promise<void> {
    await this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.addUser();
    AppComponent.app.reset();
    this.ruta.navigate(['../reserve']);
  }

  signOut(): void {
    this.authService.signOut();
  }

  refreshGoogleToken(): void {
    this.authService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  }

  addUser(): void {
    console.log(this.user);

    if (!this.user) {
      return;
    }
    this.parametersService.addUser(this.user)
      .subscribe(
        (data) => {
          console.log(data);
          //redirect home
        },
        (error) => {
          //mensaje al usuario
          alert(error);
          this.user = null;
          return of();
        }
      );
  }
}
