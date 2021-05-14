import { Component, OnInit } from '@angular/core';
import { SocialAuthService, SocialUser } from 'lib';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user:SocialUser;
  constructor(private authService:SocialAuthService) { }
  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
    });
  }
  signOut(): void {
    this.authService.signOut();
    window.location.reload();
  }

}
