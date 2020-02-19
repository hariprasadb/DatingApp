import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { AlertifyServiceService } from '../_services/alertifyService.service';

@Injectable({
  providedIn: 'root'
})

// ng g  guard auth --skipTests
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router, private alertify: AlertifyServiceService){
  }
  canActivate(): boolean  {
    if (this.authService.loggedIn()) {
      return true;
    }
    this.alertify.error('you shall not pass!!!');
    this.router.navigate(['/home']);
  }
  
}
