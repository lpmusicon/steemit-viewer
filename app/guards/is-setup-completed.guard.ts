import { Injectable } from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild
} from '@angular/router';

import * as ApplicationSettings from "application-settings";

@Injectable()
export class IsSetupCompletedGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const AccountName = ApplicationSettings.getString('accountName', null);
    if(AccountName === null) {
        this.router.navigate(['/setup/first-run']);
        return false;
    }

    return true;
  }
}