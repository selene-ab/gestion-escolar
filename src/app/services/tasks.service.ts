import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { DeliverTask } from "../interfaces/deliver-task";
import { EvaluateTask } from "../interfaces/evaluate-task";
import { NewTask } from "../interfaces/new-task";
import { Task } from "../models/task";

@Injectable({
  providedIn: "root",
})
export class TasksService {
  constructor(private http: HttpClient) {}

  createTasks(task: NewTask) {
    return this.http.post(environment.urlStudents + "tasks/new", task);
  }

  getStudentTasksbyID(id: number): Observable<Array<Task>> {
    return this.http.get<[Task]>(
      environment.urlStudents + "students/" + id + "/tasks"
    );
  }

  getStudentTasks(): Observable<Array<Task>> {
    return this.http.get<[Task]>(environment.urlStudents + "student/tasks");
  }

  getTaskDescription(taskId: number): Observable<Task> {
    return this.http.get<Task>(environment.urlStudents + "task/" + taskId);
  }

  deliverStudentTask(taskAnswer: DeliverTask, taskID: number) {
    return this.http.post(
      environment.urlStudents + "student/tasks/" + taskID + "/delivery",
      taskAnswer
    );
  }

  evaluateStudentTask(qualification: EvaluateTask, taskID: number) {
    return this.http.post(
      environment.urlStudents + "task/" + taskID + "/evaluate",
      qualification
    );
  }
}
