import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { CreateSubject } from "../interfaces/create-subject";
import { Subject } from "../models/subject";

@Injectable({
  providedIn: "root",
})
export class SubjectsService {
  constructor(private http: HttpClient) {}

  getAllSubjects() {
    return this.http.get<[Subject]>(environment.urlStudents + "subjects");
  }

  getSubjectsById(id: number) {
    return this.http.get<Subject>(environment.urlStudents + "subjects/" + id);
  }

  createNewSubject(subject: CreateSubject) {
    return this.http.post(environment.urlStudents + "subjects/new", subject);
  }
}
