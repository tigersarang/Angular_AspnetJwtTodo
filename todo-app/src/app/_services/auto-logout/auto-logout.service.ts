import { inject, Injectable, NgZone } from '@angular/core';
import { CustomerService } from '../customer.service';
import { Router } from '@angular/router';

const LOGOUT_MINUTE = 1;
const CHECK_INTERVAL = 3000;
const STORE_KEY = 'lastAction';


@Injectable({
  providedIn: 'root'
})
export class AutoLogoutService  {

 private customerService = inject(CustomerService);
  private router = inject(Router);
  private ngZone = inject(NgZone);

  private intervaliId: any;

  constructor() {
    this.init();
  }

  init() {
    if (this.customerService.currentUser()) {
      this.reset();
      this.initListener();
      this.initInterval();
   }
  }

  public getLastAction() : number {
    const lastAction = localStorage.getItem(STORE_KEY);
    return lastAction ? parseInt(lastAction, 10) : Date.now();
  }

  public setLastAction(lastAction: number) : void {
    localStorage.setItem(STORE_KEY, lastAction.toString());
  }

  reset() {
    this.setLastAction(Date.now());
  }

  initListener() {
    this.ngZone.runOutsideAngular(() => {
      document.body.addEventListener('click', () => this.reset());
      document.body.addEventListener('mouseover', () => this.reset());
      document.body.addEventListener('mouseout', () => this.reset());
      document.body.addEventListener('keydown', () => this.reset());
      document.body.addEventListener('keyup', () => this.reset());
      document.body.addEventListener('keypress', () => this.reset());
    });
  }

  initInterval() {
    console.log("initInterval : ");
    this.ngZone.runOutsideAngular(() => {
      this.intervaliId = setInterval(() => {
        this.check();
      }, CHECK_INTERVAL);
    });
  }

  check() {
    const now = Date.now();
    const timeleft = this.getLastAction() + LOGOUT_MINUTE * 60 * 1000;
    const diff = timeleft - now;
    const isTimeout = diff < 0;

    this.ngZone.run(() => {
      console.log(`마지막 활동 후 ${LOGOUT_MINUTE}분이 지남`);

      if (isTimeout && this.customerService.currentUser()) {
        console.log(`마지막 활동 후 ${LOGOUT_MINUTE}분이 지남 logout 시작`);
        this.customerService.logout();

        if (this.intervaliId) {
          clearInterval(this.intervaliId);
        }
      }
    });
  }
}
