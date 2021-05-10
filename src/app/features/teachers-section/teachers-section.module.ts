import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "../../material.module";
import { TeachersHomeComponent } from "./components/teachers-home/teachers-home.component";
import { CreateStudentComponent } from "./components/create-student/create-student.component";
import { AppRoutingModule } from "./../../app-routing.module";
import { ReactiveFormsModule } from "@angular/forms";
import { CreateClassroomComponent } from "./components/create-classroom/create-classroom.component";
import { ClassroomsComponent } from "./components/classrooms/classrooms.component";
import { CreateSubjectComponent } from "./components/create-subject/create-subject.component";
import { SubjectsComponent } from "./components/subjects/subjects.component";
import { SetScoresComponent } from "./components/set-scores/set-scores.component";
import { CreateTaskComponent } from "./components/create-task/create-task.component";
import { AngularEditorModule } from "@kolkov/angular-editor";
import { EvaluateTaskComponent } from "./components/evaluate-task/evaluate-task.component";
import { StudentViewComponent } from "./components/student-view/student-view.component";
import { StudentInfoComponent } from "./components/student-info/student-info.component";
import { StudentViewExamsComponent } from "./components/student-view-exams/student-view-exams.component";
import { StudentViewTasksComponent } from "./components/student-view-tasks/student-view-tasks.component";
import { TeacherProfileComponent } from "./components/teacher-profile/teacher-profile.component";
import { DeleteConfirmDialogComponent } from "./components/delete-confirm-dialog/delete-confirm-dialog.component";
import { ClassroomListsComponent } from "./components/classroom-lists/classroom-lists.component";
import { StudentsListComponent } from "./components/students-list/students-list.component";

@NgModule({
  declarations: [
    TeachersHomeComponent,
    CreateStudentComponent,
    CreateClassroomComponent,
    ClassroomsComponent,
    CreateSubjectComponent,
    SubjectsComponent,
    SetScoresComponent,
    CreateTaskComponent,
    EvaluateTaskComponent,
    StudentViewComponent,
    StudentInfoComponent,
    StudentViewExamsComponent,
    StudentViewTasksComponent,
    TeacherProfileComponent,
    DeleteConfirmDialogComponent,
    ClassroomListsComponent,
    StudentsListComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularEditorModule,
  ],
})
export class TeachersSectionModule {}
