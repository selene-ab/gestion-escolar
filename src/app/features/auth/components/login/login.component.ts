import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Loggin } from "src/app/interfaces/loggin";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public error: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.loginForm = new FormGroup({
      user: new FormControl("", [Validators.required, Validators.minLength(4)]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
  }

  login() {
    const json: Loggin = {
      user: this.loginForm.get("user").value,
      password: this.loginForm.get("password").value,
    };
    this.authService.loggin(json).subscribe((result: any) => {
      console.log(result);
      if (!result.error) {
        if (this.authService.isTeacher()) {
          this.router.navigate(["profesores/perfil"]);
        }
        if (this.authService.isStudent()) {
          this.router.navigate(["area-personal"]);
        }
      } else {
        this.loginForm.reset();
        this.error = true;
      }
    });
  }
}
