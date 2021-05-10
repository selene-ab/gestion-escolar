import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { NewExam } from "../interfaces/new-exam";
import { Exam } from "../models/exam";

@Injectable({
  providedIn: "root",
})
export class ExamsService {
  constructor(private http: HttpClient) {}

  setExamScores(exam: NewExam) {
    return this.http.post(environment.urlStudents + "exams/new", exam);
  }

  getStudentExamsbyID(id: number) {
    return this.http.get<Exam>(
      environment.urlStudents + "students/" + id + "/exams"
    );
  }

  getStudentExams() {
    return this.http.get<Exam>(environment.urlStudents + "student/exams");
  }
}
