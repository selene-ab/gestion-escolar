import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { StudentsService } from "src/app/services/students.service";
import { SubjectsService } from "src/app/services/subjects.service";
import { ExamsService } from "src/app/services/exams.service";
import { Subject } from "src/app/models/subject";
import { Student } from "src/app/models/student";

@Component({
  selector: "app-student-exams",
  templateUrl: "./student-exams.component.html",
  styleUrls: ["./student-exams.component.scss"],
})
export class StudentExamsComponent implements OnInit {
  public exams = [];
  public subjects: [Subject];
  public columnsToExams: Array<string> = [
    "id",
    "subject",
    "date",
    "qualification",
  ];

  public student: Student;
  public passedExams: number = 0;
  public failedExams: number = 0;
  public averageGrade: number;

  constructor(
    private studentsService: StudentsService,
    private subjectsService: SubjectsService,
    private examsService: ExamsService
  ) {}

  ngOnInit(): void {
    this.viewStudentExams();
    this.viewSubjects();
  }

  viewSubjects() {
    this.subjectsService.getAllSubjects().subscribe((data: any) => {
      this.subjects = data;
    });
  }

  viewStudentExams() {
    this.examsService.getStudentExams().subscribe((data: any) => {
      this.exams = data;
      console.log(data);
      this.getPassedAndFailingGrades();
      this.calculateAverageGrade();
    });
  }

  getPassedAndFailingGrades() {
    this.exams.forEach((exam: any) => {
      if (exam.qualification >= 5) {
        this.passedExams += 1;
      } else {
        this.failedExams += 1;
      }
    });
  }

  calculateAverageGrade() {
    let sumOfGrades = 0;
    this.exams.forEach((exam: any) => {
      sumOfGrades += exam.qualification;
    });
    this.averageGrade = Math.round((sumOfGrades / this.exams.length) * 10) / 10;
    console.log("notas", sumOfGrades);
    console.log("redondeada", this.averageGrade);
  }
}
