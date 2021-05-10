import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import * as moment from "moment";
import { SubjectsService } from "src/app/services/subjects.service";
import { ExamsService } from "src/app/services/exams.service";
import { StudentsService } from "src/app/services/students.service";
import { NewExam } from "src/app/interfaces/new-exam";
import { Student } from "src/app/models/student";
import { Subject } from "src/app/models/subject";

@Component({
  selector: "app-set-scores",
  templateUrl: "./set-scores.component.html",
  styleUrls: ["./set-scores.component.scss"],
})
export class SetScoresComponent implements OnInit {
  public examForm: FormGroup;
  public students: [Student];
  public subjects: [Subject];
  public success: boolean = false;

  constructor(
    private subjectsService: SubjectsService,
    private examsService: ExamsService,
    private studentsService: StudentsService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.viewStudents();
    this.viewSubjects();
  }

  initForm() {
    this.examForm = new FormGroup({
      student: new FormControl("", [Validators.required]),
      subject: new FormControl("", [Validators.required]),
      score: new FormControl("", [Validators.required]),
      examDate: new FormControl("", [Validators.required]),
    });
  }

  viewStudents() {
    this.studentsService.getStudentsList().subscribe((data: any) => {
      this.students = data;
    });
  }

  viewSubjects() {
    this.subjectsService.getAllSubjects().subscribe((data: any) => {
      this.subjects = data;
    });
  }

  saveExamScore() {
    let json: NewExam = {
      student: this.examForm.get("student").value,
      subject: this.examForm.get("subject").value,
      qualification: this.examForm.get("score").value,
      time: moment(this.examForm.get("examDate").value).format(
        "YYYY-MM-DD 	HH:mm:00"
      ),
    };

    this.examsService.setExamScores(json).subscribe((result: any) => {
      console.log(result);
      if (result.success) {
        this.success = true;
        setTimeout(() => {
          this.success = false;
        }, 3500);
        this.examForm.reset();
      }
    });
  }
}
