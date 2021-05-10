import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Classroom } from "../models/classroom";
import { map } from "rxjs/operators";
import { CreateClassroom } from "../interfaces/create-classroom";

@Injectable({
  providedIn: "root",
})
export class ClassroomsService {
  constructor(private http: HttpClient) {}

  getClassrooms() {
    return this.http.get<[Classroom]>(environment.urlStudents + "classrooms");
  }

  getListsByClassrooms(classroomId: number) {
    return this.http
      .get(environment.urlStudents + "students", {
        params: {
          classroom: "" + classroomId,
        },
      })
      .pipe(
        map((item: any) => {
          let classroomList = [];
          item.students.map((student: any) => {
            if (student.classroom_id == classroomId) {
              classroomList.push(student);
            }
          });

          return classroomList;
        })
      );
  }

  createNewClassroom(newClassroom: CreateClassroom) {
    return this.http.post(
      environment.urlStudents + "classrooms/new",
      newClassroom
    );
  }

  deleteClassroom(id: number) {
    return this.http.post(
      environment.urlStudents + "classrooms/" + id + "/delete",
      {}
    );
  }
}
