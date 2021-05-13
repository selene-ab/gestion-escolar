import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { StudentsService } from "src/app/services/students.service";
import * as moment from "moment";
import { ClassroomsService } from "src/app/services/classrooms.service";
import { NewStudent } from "src/app/interfaces/new-student";
import { Clipboard } from "@angular/cdk/clipboard";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-create-student",
  templateUrl: "./create-student.component.html",
  styleUrls: ["./create-student.component.scss"],
})
export class CreateStudentComponent implements OnInit {
  public createStudentForm: FormGroup;
  public classroomInfo = [];
  public success: boolean = false;
  public randomPassword: string;

  constructor(
    private studentsService: StudentsService,
    private classroomsService: ClassroomsService,
    private clipboard: Clipboard,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.viewClassrooms();
    this.initForm();
  }

  viewClassrooms() {
    this.classroomsService.getClassrooms().subscribe((data: any) => {
      this.classroomInfo = data;
    });
  }

  initForm() {
    this.createStudentForm = new FormGroup({
      firstName: new FormControl("", [
        Validators.required,
        Validators.maxLength(45),
        Validators.minLength(3),
      ]),
      lastName: new FormControl("", [
        Validators.required,
        Validators.maxLength(45),
        Validators.minLength(3),
      ]),
      birthDate: new FormControl("", [Validators.required]),
      phoneNumber: new FormControl("", [
        Validators.required,
        Validators.maxLength(45),
      ]),
      address: new FormControl("", [
        Validators.required,
        Validators.maxLength(150),
      ]),
      email: new FormControl("", [
        Validators.required,
        Validators.email,
        Validators.maxLength(150),
      ]),
      classroom: new FormControl("", [Validators.required]),
      gender: new FormControl("", [Validators.required]),
      random: new FormControl(""),
      password: new FormControl("", [Validators.required]),
    });
  }

  generatePassword() {
    const characters =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789";
    let password = "";
    const max = characters.length - 1;

    for (let i = 0; i < 15; i++) {
      password += characters[Math.floor(Math.random() * (max + 1))];
    }
    this.randomPassword = password;
    this.createStudentForm.patchValue({
      random: this.randomPassword,
    });
    return;
  }

  createStudent() {
    const json: NewStudent = {
      first_name: this.createStudentForm.get("firstName").value,
      last_name: this.createStudentForm.get("lastName").value,
      birth_date: moment(this.createStudentForm.get("birthDate").value).format(
        "YYYY-MM-DD"
      ),
      phone: this.createStudentForm.get("phoneNumber").value,
      address: this.createStudentForm.get("address").value,
      email: this.createStudentForm.get("email").value,
      classroom: this.createStudentForm.get("classroom").value,
      gender: this.createStudentForm.get("gender").value,
      password: this.createStudentForm.get("password").value,
    };

    this.studentsService.createNewStudent(json).subscribe((result: any) => {
      console.log(result);
      if (result.success) {
        this.success = true;

        setTimeout(() => {
          this.success = false;
        }, 3500);

        this.createStudentForm.reset();
      }
    });
  }

  copyToClipboard() {
    this.clipboard.copy(this.createStudentForm.get("random").value);
    this.snackBar.open("¡Texto copiado al portapapeles!", null, {
      duration: 2000,
      panelClass: "snackbar",
    });
  }
}
