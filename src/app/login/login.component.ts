import { Component, OnInit, ViewChild } from '@angular/core';

import { SocialAuthService } from 'lib';
import { SocialUser } from 'lib';
import { ParametersService } from 'src/app/services/service.index';
import { GoogleLoginProvider} from 'lib';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

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
    private parametersService: ParametersService
  ) {}

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
    });
  }

  async signInWithGoogle(): Promise<void> {
    await this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.addUser();
  }

  signOut(): void {
    this.authService.signOut();
  }

  refreshGoogleToken(): void {
    this.authService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  }

  addUser(): void {
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
          console.log(error);
          this.user = null;
          return of();
        }
      );
  }
}
