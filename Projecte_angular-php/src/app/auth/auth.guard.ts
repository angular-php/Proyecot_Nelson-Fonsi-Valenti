import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
  Observable<boolean> {
    return this.authService.isAuthenticated().pipe(map((response: {
      authenticated: boolean
    }) => {
      if(response.authenticated) {
        return true;
      }
      this.router.navigate(['/login']);
      return false;
    }), ((error) => {
      this.router.navigate(['/login']);
      return of(false);
    }));
  }

  constructor(private authService: AuthService, private router: Router) {}
}
