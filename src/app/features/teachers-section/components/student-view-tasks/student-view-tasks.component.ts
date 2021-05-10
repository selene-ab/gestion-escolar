import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import { Student } from "src/app/models/student";
import { Task } from "src/app/models/task";
import { TasksService } from "src/app/services/tasks.service";

@Component({
  selector: "app-student-view-tasks",
  templateUrl: "./student-view-tasks.component.html",
  styleUrls: ["./student-view-tasks.component.scss"],
})
export class StudentViewTasksComponent implements OnInit, OnChanges {
  @Input() public student: Student;
  public tasks: [Task];

  constructor(private tasksService: TasksService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.student) {
      this.viewStudentTasks(changes.student.currentValue.id);
    }
  }

  viewStudentTasks(id: number) {
    this.tasksService.getStudentTasksbyID(id).subscribe((data: any) => {
      this.tasks = data;
    });
  }
}
