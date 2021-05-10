import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "../../material.module";
import { StudentHomeComponent } from "./components/student-home/student-home.component";
import { StudentTasksComponent } from "./components/student-tasks/student-tasks.component";
import { StudentProfileComponent } from "./components/student-profile/student-profile.component";
import { AppRoutingModule } from "./../../app-routing.module";
import { ReactiveFormsModule } from "@angular/forms";
import { StudentExamsComponent } from "./components/student-exams/student-exams.component";
import { TaskDescriptionComponent } from "./components/task-description/task-description.component";
import { AngularEditorModule } from "@kolkov/angular-editor";

@NgModule({
  declarations: [
    StudentHomeComponent,
    StudentTasksComponent,
    StudentProfileComponent,
    StudentExamsComponent,
    TaskDescriptionComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularEditorModule,
  ],
})
export class StudentsSectionModule {}
