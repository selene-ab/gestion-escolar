import { Injectable } from "@angular/core";
import { CanActivate, CanActivateChild, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: "root",
})
export class StudentGuard implements CanActivate, CanActivateChild {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate() {
    if (this.authService.isStudent()) {
      return true;
    } else {
      return false;
    }
  }
  canActivateChild() {
    if (this.authService.isStudent()) {
      return true;
    } else {
      return false;
    }
  }
}
