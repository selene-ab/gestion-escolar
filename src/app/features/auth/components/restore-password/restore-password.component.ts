import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-restore-password",
  templateUrl: "./restore-password.component.html",
  styleUrls: ["./restore-password.component.scss"],
})
export class RestorePasswordComponent implements OnInit {
  public restoreForm: FormGroup;
  constructor() {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.restoreForm = new FormGroup({
      user_name: new FormControl("", [
        Validators.required,
        Validators.minLength(4),
      ]),
      email: new FormControl("", [Validators.required, Validators.email]),
    });
  }

  restorePassword() {
    const json = {
      user: this.restoreForm.get("user_name").value,
      email: this.restoreForm.get("email").value,
    };
  }
}
