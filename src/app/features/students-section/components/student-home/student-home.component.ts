import { Component, OnInit } from "@angular/core";
import { Student } from "src/app/models/student";

import { StudentsService } from "src/app/services/students.service";

@Component({
  selector: "app-student-home",
  templateUrl: "./student-home.component.html",
  styleUrls: ["./student-home.component.scss"],
})
export class StudentHomeComponent implements OnInit {
  public user: Student;

  constructor(private studentsService: StudentsService) {}

  ngOnInit(): void {
    this.viewStudentInfo();
  }

  viewStudentInfo() {
    this.studentsService.getStudentProfile().subscribe((data: any) => {
      this.user = data;
      console.log("desde home", data);
    });
  }
}
