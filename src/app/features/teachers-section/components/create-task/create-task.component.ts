import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AngularEditorConfig } from "@kolkov/angular-editor";
import * as moment from "moment";
import { SubjectsService } from "src/app/services/subjects.service";
import { TasksService } from "src/app/services/tasks.service";
import { StudentsService } from "src/app/services/students.service";
import { NewTask } from "src/app/interfaces/new-task";
import { Student } from "src/app/models/student";
import { Subject } from "src/app/models/subject";
@Component({
  selector: "app-create-task",
  templateUrl: "./create-task.component.html",
  styleUrls: ["./create-task.component.scss"],
})
export class CreateTaskComponent implements OnInit {
  public tasksForm: FormGroup;
  public success: boolean = false;
  public students: [Student];
  public subjects: [Subject];

  constructor(
    private subjectsService: SubjectsService,
    private tasksService: TasksService,
    private studentsService: StudentsService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.viewStudents();
    this.viewSubjects();
  }

  public editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: "15rem",
    minHeight: "5rem",
    placeholder: "Descripción de la tarea",
    translate: "no",
    defaultParagraphSeparator: "p",
    defaultFontName: "Arial",
    toolbarHiddenButtons: [
      ["undo", "redo", "strikeThrough"],
      ["backgroundColor", "insertVideo", "toggleEditorMode"],
    ],
  };

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

  initForm() {
    this.tasksForm = new FormGroup({
      student: new FormControl(""),
      subject: new FormControl(""),
      name: new FormControl("", [Validators.required]),
      start_period: new FormControl("", [Validators.required]),
      end_period: new FormControl("", [Validators.required]),
      description: new FormControl("", [Validators.required]),
    });
  }

  saveTask() {
    let json: NewTask = {
      student: this.tasksForm.get("student").value,
      subject: this.tasksForm.get("subject").value,
      name: this.tasksForm.get("name").value,
      description: this.tasksForm.get("description").value,
      period: {
        start: moment(this.tasksForm.get("start_period").value).format(
          "YYYY-MM-DD"
        ),
        end: moment(this.tasksForm.get("end_period").value).format(
          "YYYY-MM-DD"
        ),
      },
    };
    this.tasksService.createTasks(json).subscribe((result: any) => {
      if (result.success) {
        this.success = true;

        setTimeout(() => {
          this.success = false;
        }, 3500);
        this.tasksForm.reset();
      }
    });
  }
}
