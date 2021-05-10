import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Location } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { TasksService } from "src/app/services/tasks.service";
import { Task } from "src/app/models/task";
import { StudentsService } from "src/app/services/students.service";
import { Student } from "src/app/models/student";
import { EvaluateTask } from "src/app/interfaces/evaluate-task";

@Component({
  selector: "app-evaluate-task",
  templateUrl: "./evaluate-task.component.html",
  styleUrls: ["./evaluate-task.component.scss"],
})
export class EvaluateTaskComponent implements OnInit {
  public evaluationForm: FormGroup;
  public task: Task;
  public student: Student;

  constructor(
    private location: Location,
    private router: ActivatedRoute,
    private tasksService: TasksService,
    private studentsService: StudentsService
  ) {}

  ngOnInit(): void {
    this.router.paramMap.subscribe((params: any) => {
      const taskID = params.params.id;
      this.viewTask(taskID);
    });
    this.initForm();
  }

  viewTask(id: number) {
    this.tasksService.getTaskDescription(id).subscribe((data: any) => {
      this.task = data;
      this.getStudentInfo(data.student);
    });
  }

  getStudentInfo(id: number) {
    this.studentsService.getStudentById(id).subscribe((data: any) => {
      this.student = data;
    });
  }

  initForm() {
    this.evaluationForm = new FormGroup({
      qualification: new FormControl("", [Validators.required]),
    });
  }

  markAsEvaluated() {
    const json: EvaluateTask = {
      qualification: this.evaluationForm.get("qualification").value,
    };

    this.tasksService
      .evaluateStudentTask(json, this.task.id)
      .subscribe((result: any) => {
        if (result.success) {
          this.goBack();
        }
      });
  }

  goBack() {
    this.location.back();
  }
}
