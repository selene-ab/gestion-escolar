import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { CreateClassroom } from "src/app/interfaces/create-classroom";
import { ClassroomsService } from "src/app/services/classrooms.service";

@Component({
  selector: "app-create-classroom",
  templateUrl: "./create-classroom.component.html",
  styleUrls: ["./create-classroom.component.scss"],
})
export class CreateClassroomComponent implements OnInit {
  public createClassroomForm: FormGroup;
  public success: boolean = false;
  constructor(private classroomsService: ClassroomsService) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.createClassroomForm = new FormGroup({
      name: new FormControl("", [Validators.required, Validators.minLength(3)]),
      teacher: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
      ]),
      email: new FormControl("", [Validators.required, Validators.email]),
    });
  }

  createClassroom() {
    let json: CreateClassroom = {
      name: this.createClassroomForm.get("name").value,
      teacher_name: this.createClassroomForm.get("teacher").value,
      teacher_email: this.createClassroomForm.get("email").value,
    };
    this.classroomsService.createNewClassroom(json).subscribe((result: any) => {
      console.log(result);
      if (result.success) {
        this.success = true;

        setTimeout(() => {
          this.success = false;
        }, 3500);

        this.createClassroomForm.reset();
      }
    });
    console.log(json);
  }
}
