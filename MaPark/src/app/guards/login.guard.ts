import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
// import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
// import { Observable } from 'rxjs';

import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class LoginGuard implements CanActivate {

    constructor(private authService: AuthenticationService, private router: Router) { }

    canActivate() {
        // If the user is not logged in we'll send them back to the home page
        if( this.authService.getSessionStatus ){
          return true
        }
        else{
          this.router.navigate(['/']);
          return false
        }
    }
}