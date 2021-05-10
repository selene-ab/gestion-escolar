import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomePageComponent } from "./features/home/components/home-page/home-page.component";
import { StudentsListComponent } from "./features/teachers-section/components/students-list/students-list.component";
import { StudentHomeComponent } from "./features/students-section/components/student-home/student-home.component";
import { ClassroomsComponent } from "./features/teachers-section/components/classrooms/classrooms.component";
import { CreateClassroomComponent } from "./features/teachers-section/components/create-classroom/create-classroom.component";
import { CreateStudentComponent } from "./features/teachers-section/components/create-student/create-student.component";
import { CreateSubjectComponent } from "./features/teachers-section/components/create-subject/create-subject.component";
import { SetScoresComponent } from "./features/teachers-section/components/set-scores/set-scores.component";
import { SubjectsComponent } from "./features/teachers-section/components/subjects/subjects.component";
import { TeachersHomeComponent } from "./features/teachers-section/components/teachers-home/teachers-home.component";
import { StudentProfileComponent } from "./features/students-section/components/student-profile/student-profile.component";
import { StudentExamsComponent } from "./features/students-section/components/student-exams/student-exams.component";
import { StudentTasksComponent } from "./features/students-section/components/student-tasks/student-tasks.component";
import { CreateTaskComponent } from "./features/teachers-section/components/create-task/create-task.component";
import { TaskDescriptionComponent } from "./features/students-section/components/task-description/task-description.component";
import { AuthGuard } from "./guards/auth.guard";
import { LoginComponent } from "./features/auth/components/login/login.component";
import { RegisterComponent } from "./features/auth/components/register/register.component";
import { RestorePasswordComponent } from "./features/auth/components/restore-password/restore-password.component";
import { GuestGuard } from "./guards/guest.guard";
import { EvaluateTaskComponent } from "./features/teachers-section/components/evaluate-task/evaluate-task.component";
import { StudentViewComponent } from "./features/teachers-section/components/student-view/student-view.component";
import { TeacherProfileComponent } from "./features/teachers-section/components/teacher-profile/teacher-profile.component";
import { TeacherGuard } from "./guards/teacher.guard";
import { StudentGuard } from "./guards/student.guard";

const routes: Routes = [
  { path: "", component: HomePageComponent },
  {
    path: "iniciar-sesion",
    component: LoginComponent,
    canActivate: [GuestGuard],
  },
  {
    path: "registrarse",
    component: RegisterComponent,
    canActivate: [GuestGuard],
  },
  {
    path: "recuperar-contraseña",
    component: RestorePasswordComponent,
    canActivate: [GuestGuard],
  },

  {
    path: "profesores",
    component: TeachersHomeComponent,
    canActivate: [AuthGuard, TeacherGuard],
    canActivateChild: [AuthGuard, TeacherGuard],
    children: [
      { path: "perfil", component: TeacherProfileComponent },
      { path: "crear-alumno", component: CreateStudentComponent },
      { path: "clases", component: ClassroomsComponent },
      { path: "clases/crear-clase", component: CreateClassroomComponent },
      { path: "asignaturas", component: SubjectsComponent },
      { path: "asignaturas/crear", component: CreateSubjectComponent },
      { path: "examenes/poner-notas", component: SetScoresComponent },
      { path: "tareas/crear", component: CreateTaskComponent },
      { path: "tareas/evaluar/:id", component: EvaluateTaskComponent },
      { path: "alumnos", component: StudentsListComponent },
      { path: "alumno/:id", component: StudentViewComponent },
    ],
  },

  {
    path: "area-personal",
    component: StudentHomeComponent,
    canActivate: [AuthGuard, StudentGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
