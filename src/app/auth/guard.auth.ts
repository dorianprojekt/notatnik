import { AuthService, AUTH_LOGIN_OK} from './../services/auth.service';
import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate() {
    if (this.authService.getLoginState().value.state === AUTH_LOGIN_OK) {
      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page with previous url
    this.router.navigate(['/login']); //, { queryParams: { returnUrl: state.url } });
    return false;
  }
}
