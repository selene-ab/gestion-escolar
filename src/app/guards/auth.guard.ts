import { Injectable } from "@angular/core";
import { CanActivate, CanActivateChild, Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate() {
    if (this.authService.isLogged()) {
      return true;
    } else {
      return this.router.navigate(["iniciar-sesion"]);
    }
  }
  canActivateChild() {
    if (this.authService.isLogged()) {
      return true;
    } else {
      return this.router.navigate(["iniciar-sesion"]);
    }
  }
}
