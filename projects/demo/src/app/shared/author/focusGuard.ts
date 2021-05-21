import { CanActivate } from '@angular/router';
export class LoginGuard implements CanActivate {
  canActivate() {
      const userName = localStorage.getItem('user_name');
      if (userName === 'yangmu'){
          return true;
      }else {
        return false;
      }
    // let loggedIn: boolean = false;
    // return loggedIn; // retunrn出true或false true允许进入路由 false不允许进入路由
  }
}
