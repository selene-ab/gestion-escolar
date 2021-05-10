import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.registerForm = new FormGroup({
      first_name: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
      ]),
      last_name: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
      ]),
      email: new FormControl("", [Validators.required, Validators.email]),
      user_name: new FormControl("", [
        Validators.required,
        Validators.minLength(4),
      ]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(10),
      ]),
    });
  }

  signUp() {
    let json = {
      first_name: this.registerForm.get("first_name").value,
      last_name: this.registerForm.get("last_name").value,
      email: this.registerForm.get("email").value,
      user_name: this.registerForm.get("user_name").value,
      password: this.registerForm.get("password").value,
    };

    console.log(json);
    this.registerForm.reset();
  }
}
