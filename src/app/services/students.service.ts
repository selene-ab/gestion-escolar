import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Student } from "../models/student";
import { map } from "rxjs/operators";
import { NewStudent } from "../interfaces/new-student";

@Injectable({
  providedIn: "root",
})
export class StudentsService {
  constructor(private http: HttpClient) {}

  getStudentsList() {
    return this.http.get<[Student]>(environment.urlStudents + "students").pipe(
      map((item: any) => {
        return item.students;
      })
    );
  }

  getStudentProfile() {
    return this.http.get<Student>(environment.urlStudents + "student/profile");
  }

  getStudentById(id: number) {
    return this.http.get<Student>(environment.urlStudents + "students/" + id);
  }

  createNewStudent(student: NewStudent) {
    return this.http.post(environment.urlStudents + "students/new", student);
  }

  updateStudentProfile(student: NewStudent) {
    return this.http.post(environment.urlStudents + "student/profile", student);
  }

  deleteStudent(id: number) {
    return this.http.post(
      environment.urlStudents + "students/" + id + "/delete",
      {}
    );
  }
}
