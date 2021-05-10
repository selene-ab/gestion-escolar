import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core";
import { Task } from "src/app/models/task";
import { TasksService } from "src/app/services/tasks.service";
import { AngularEditorConfig } from "@kolkov/angular-editor";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import * as moment from "moment";
import { DeliverTask } from "src/app/interfaces/deliver-task";

@Component({
  selector: "app-task-description",
  templateUrl: "./task-description.component.html",
  styleUrls: ["./task-description.component.scss"],
})
export class TaskDescriptionComponent implements OnInit, OnChanges {
  public task: Task;
  public error: boolean = false;
  public editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: "15rem",
    minHeight: "5rem",
    placeholder: "Escribe tu respuesta",
    translate: "no",
    defaultParagraphSeparator: "p",
    defaultFontName: "Arial",
    toolbarHiddenButtons: [
      ["undo", "redo", "strikeThrough"],
      ["backgroundColor", "insertVideo", "toggleEditorMode"],
    ],
  };
  public answerForm: FormGroup;
  public disableButton: boolean = false;

  @Input()
  public taskID;

  @Output() updateTasks = new EventEmitter<any>();

  constructor(private tasksService: TasksService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.taskID) {
      this.viewTaskDescription(changes.taskID.currentValue);
    }
  }

  ngOnInit(): void {
    this.initForm();
  }

  viewTaskDescription(id: number) {
    this.tasksService.getTaskDescription(id).subscribe((data: any) => {
      this.task = data;
    });
  }

  initForm() {
    this.answerForm = new FormGroup({
      description: new FormControl("", [
        Validators.required,
        Validators.minLength(600),
      ]),
    });
  }

  deliverTask() {
    const json: DeliverTask = {
      response: this.answerForm.get("description").value,
    };
    if (moment().isBetween(this.task.period.start, this.task.period.end)) {
      this.tasksService
        .deliverStudentTask(json, this.task.id)
        .subscribe((result: any) => {
          if (result.success) {
            this.answerForm.reset();
            this.updateTasks.emit();
          }
        });
    } else {
      this.error = true;
      this.disableButton = true;
      setTimeout(() => {
        this.error = false;
      }, 3500);
    }
  }
}
