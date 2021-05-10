import { Component, OnInit } from "@angular/core";
import { Task } from "src/app/models/task";
import { TasksService } from "src/app/services/tasks.service";

@Component({
  selector: "app-student-tasks",
  templateUrl: "./student-tasks.component.html",
  styleUrls: ["./student-tasks.component.scss"],
})
export class StudentTasksComponent implements OnInit {
  public tasks: [Task];
  public openTask = null;
  public showTaskDiv: boolean = false;

  constructor(private tasksService: TasksService) {}

  ngOnInit(): void {
    this.viewStudentTasks();
  }

  viewStudentTasks() {
    this.tasksService.getStudentTasks().subscribe((data: any) => {
      this.tasks = data;
    });
  }

  selectTask(taskID: number) {
    this.openTask = taskID;
    this.showTaskDiv = true;
  }

  closeTaskDiv() {
    this.showTaskDiv = false;
  }

  updateTaskStatus() {
    this.viewStudentTasks();
    this.showTaskDiv = false;
  }
}
