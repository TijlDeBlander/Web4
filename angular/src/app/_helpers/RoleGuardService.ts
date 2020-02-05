import { Injectable } from '@angular/core';
import {Router, CanActivate, ActivatedRoute, ActivatedRouteSnapshot} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
@Injectable()
export class RoleGuardService implements CanActivate {
  constructor(public auth: AuthenticationService, public router: Router) {}
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data.expectedRole;
    if (this.auth.getRole() !== expectedRole) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
