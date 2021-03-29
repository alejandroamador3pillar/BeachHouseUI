import { Component, OnInit } from '@angular/core';

import { SocialAuthService } from 'lib';
import { SocialUser } from 'lib';
import {ParametersComponent} from '../parameters/parameters.component';
import {ParametersService} from '../parameters/parameters.service';
import {
  GoogleLoginProvider,
  FacebookLoginProvider,
  AmazonLoginProvider,
  VKLoginProvider,
  MicrosoftLoginProvider
} from 'lib';

@Component({
  selector: 'app-demo',
  providers: [ParametersService],
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {

  user: SocialUser;
  GoogleLoginProvider = GoogleLoginProvider;
  
  public parameter: ParametersComponent;

  constructor(private authService: SocialAuthService) { }

  ngOnInit() {
    this.authService.authState.subscribe(user => {
      this.user = user;
    });    
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

/*   signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signInWithAmazon(): void {
    this.authService.signIn(AmazonLoginProvider.PROVIDER_ID);
  }

  signInWithVK(): void {
    this.authService.signIn(VKLoginProvider.PROVIDER_ID);
  }

  signInWithMicrosoft(): void {
    this.authService.signIn(MicrosoftLoginProvider.PROVIDER_ID);
  } */

  signOut(): void {
    this.authService.signOut();
  }

  refreshGoogleToken(): void {
    this.authService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  }
  
  addUser(): void{
    this.parameter.addUser(this.user.id);
  }

}
