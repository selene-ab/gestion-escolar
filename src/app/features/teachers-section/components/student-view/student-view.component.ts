import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { Student } from "src/app/models/student";
import { StudentsService } from "src/app/services/students.service";
import { DeleteConfirmDialogComponent } from "../delete-confirm-dialog/delete-confirm-dialog.component";

@Component({
  selector: "app-student-view",
  templateUrl: "./student-view.component.html",
  styleUrls: ["./student-view.component.scss"],
})
export class StudentViewComponent implements OnInit {
  public studentInfo: Student;
  public studentID: number;
  constructor(
    private studentsService: StudentsService,
    private router: ActivatedRoute,
    public dialog: MatDialog,
    private navigation: Router
  ) {}

  ngOnInit(): void {
    this.router.paramMap.subscribe((params: any) => {
      console.log(params.params);
      this.studentID = params.params.id;
      this.viewStudentInfo(this.studentID);
    });
  }

  viewStudentInfo(id: number) {
    this.studentsService.getStudentById(id).subscribe((data: any) => {
      this.studentInfo = data;
      console.log(this.studentInfo);
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      data: {
        message: `¿Estás seguro de que quieres borrar a ${this.studentInfo.first_name} ${this.studentInfo.last_name}`,
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.studentsService
          .deleteStudent(this.studentID)
          .subscribe((deleted: any) => {
            if (deleted.success) {
              this.navigation.navigate(["/profesores/alumnos"]);
            }
          });
      }
    });
  }
}
