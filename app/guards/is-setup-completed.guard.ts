import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot, CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot
} from "@angular/router";

import * as ApplicationSettings from "application-settings";

@Injectable()
export class IsSetupCompletedGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const ACCOUNT_NAME = ApplicationSettings.getString("accountName", null);
    if (ACCOUNT_NAME === null) {
        this.router.navigate(["/setup/first-run"]);

        return false;
    }

    return true;
  }
}
