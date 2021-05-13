import { Component, Inject, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DEFAULT_INTERRUPTSOURCES, Idle } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { SocialAuthService } from 'dist/lib';
import { BsModalRef, ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  static app;
  title = 'app works!';
  idleState = "Por comenzar";
  timedOut = false;
  isCollapsed: boolean = false;
  public modalRef?: BsModalRef;

  @ViewChild('logoutModal', { static: false }) logoutModal?: ModalDirective;

  constructor(private idle: Idle, private authService: SocialAuthService, private router: Router) {
    AppComponent.app = this;
    // sets an idle timeout of 5 seconds, for testing purposes.
    idle.setIdle(20);
    // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
    idle.setTimeout(10);
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    idle.onIdleEnd.subscribe(() => {
      this.idleState = 'Active';
      this.reset();
    });

    idle.onTimeout.subscribe(() => {
      this.idleState = 'Logged out!';
      this.timedOut = true;
      this.logout();
    });

    idle.onIdleStart.subscribe(() => {
        this.idleState = 'Inactive';
    });

    idle.onTimeoutWarning.subscribe((countdown) => {
      this.idleState = 'You will be logged out out in ' + countdown + ' seconds!';
      this.logoutModal?.show();
    });

    authService.authState.subscribe(user => {
      if(user){
        this.reset();
      }})
    //this.reset();
  }

  reset() {
    this.idle.watch();
    this.idleState = 'Active.';
    this.timedOut = false;
  }

  logout(): void{
    this.authService.signOut();
    this.logoutModal?.hide();
    this.router.navigate(['../login']);
  }

  stay(): void{
    this.logoutModal?.hide();
    this.reset();
  }


}
