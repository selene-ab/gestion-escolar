import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { StudentsService } from "src/app/services/students.service";
import * as moment from "moment";
import { ClassroomsService } from "src/app/services/classrooms.service";
import { Classroom } from "src/app/models/classroom";
import { NewStudent } from "src/app/interfaces/new-student";

@Component({
  selector: "app-student-profile",
  templateUrl: "./student-profile.component.html",
  styleUrls: ["./student-profile.component.scss"],
})
export class StudentProfileComponent implements OnInit {
  public modifyForm: FormGroup;
  public profile: any = [];
  public saveButton: boolean = false;
  public classrooms: [Classroom];
  public success: boolean = false;
  public age: number;
  constructor(
    private studentsService: StudentsService,
    private router: ActivatedRoute,
    private classroomsService: ClassroomsService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getClassrooms();
    this.viewStudentProfile();
  }

  viewStudentProfile() {
    this.studentsService.getStudentProfile().subscribe((data: any) => {
      this.profile = data;
      console.log(data);
      this.age = moment().diff(moment(this.profile.birth_date), "years");
      this.setFormValue();
    });
  }

  getClassrooms() {
    this.classroomsService.getClassrooms().subscribe((data: any) => {
      this.classrooms = data;
    });
  }

  initForm() {
    this.modifyForm = new FormGroup({
      firstName: new FormControl({ value: "", disabled: true }, [
        Validators.required,
        Validators.maxLength(45),
        Validators.minLength(3),
      ]),
      lastName: new FormControl({ value: "", disabled: true }, [
        Validators.required,
        Validators.maxLength(45),
        Validators.minLength(3),
      ]),
      gender: new FormControl({ value: "", disabled: true }, [
        Validators.required,
      ]),
      birthDate: new FormControl({ value: "", disabled: true }, [
        Validators.required,
      ]),
      address: new FormControl({ value: "", disabled: true }, [
        Validators.required,
        Validators.maxLength(150),
      ]),
      email: new FormControl({ value: "", disabled: true }, [
        Validators.required,
        Validators.email,
        Validators.maxLength(150),
      ]),
      classroom: new FormControl({ value: "", disabled: true }, [
        Validators.required,
      ]),
      phone: new FormControl({ value: "", disabled: true }, [
        Validators.required,
        Validators.maxLength(45),
      ]),
    });
  }

  setFormValue() {
    this.modifyForm.patchValue({
      firstName: this.profile.first_name,
      lastName: this.profile.last_name,
      gender: this.profile.gender,
      birthDate: this.profile.birth_date,
      address: this.profile.address,
      email: this.profile.email,
      classroom: this.profile.classroom_id,
      phone: this.profile.phone,
    });
  }

  activateForm() {
    this.modifyForm.get("firstName").enable();
    this.modifyForm.get("lastName").enable();
    this.modifyForm.get("gender").enable();
    this.modifyForm.get("birthDate").enable();
    this.modifyForm.get("address").enable();
    this.modifyForm.get("email").enable();
    this.modifyForm.get("classroom").enable();
    this.modifyForm.get("phone").enable();
    this.saveButton = true;
  }

  disableForm() {
    this.modifyForm.get("firstName").disable();
    this.modifyForm.get("lastName").disable();
    this.modifyForm.get("gender").disable();
    this.modifyForm.get("birthDate").disable();
    this.modifyForm.get("address").disable();
    this.modifyForm.get("email").disable();
    this.modifyForm.get("classroom").disable();
    this.modifyForm.get("phone").disable();
    this.saveButton = false;
  }

  saveChanges() {
    this.disableForm();
    let json: NewStudent = {
      first_name: this.modifyForm.get("firstName").value,
      last_name: this.modifyForm.get("lastName").value,
      birth_date: moment(this.modifyForm.get("birthDate").value).format(
        "YYYY-MM-DD"
      ),
      gender: this.modifyForm.get("gender").value,
      address: this.modifyForm.get("address").value,
      email: this.modifyForm.get("email").value,
      classroom: this.modifyForm.get("classroom").value,
      phone: this.modifyForm.get("phone").value,
    };
    this.studentsService.updateStudentProfile(json).subscribe((result: any) => {
      console.log(result);
      if (result.success) {
        this.age = moment().diff(moment(json.birth_date), "years");
        this.success = true;
        setTimeout(() => {
          this.success = false;
        }, 3500);
      }
    });
    console.log(json);
  }

  cancelAction() {
    this.setFormValue();
    this.disableForm();
  }
}
