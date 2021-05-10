import { Component, OnInit, Input } from "@angular/core";
import { Student } from "src/app/models/student";

@Component({
  selector: "app-student-info",
  templateUrl: "./student-info.component.html",
  styleUrls: ["./student-info.component.scss"],
})
export class StudentInfoComponent implements OnInit {
  @Input() student: Student;

  constructor() {}

  ngOnInit(): void {}
}
