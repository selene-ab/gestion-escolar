import { Component, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { ClassroomsService } from "src/app/services/classrooms.service";
import { DeleteConfirmDialogComponent } from "../delete-confirm-dialog/delete-confirm-dialog.component";

@Component({
  selector: "app-classrooms",
  templateUrl: "./classrooms.component.html",
  styleUrls: ["./classrooms.component.scss"],
})
export class ClassroomsComponent implements OnInit {
  public classrooms = [];

  constructor(
    private classroomsService: ClassroomsService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.viewClassrooms();
  }

  viewClassrooms(): void {
    this.classroomsService.getClassrooms().subscribe((data: any) => {
      this.classrooms = data;
      console.log(this.classrooms);
    });
  }

  openDialog(id: number, name: string) {
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      data: {
        message: `¿Estás seguro de que quieres borrar la clase ${name}`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.classroomsService.deleteClassroom(id).subscribe();
        this.classrooms = this.classrooms.filter((item) => {
          return item.id !== id;
        });
      }
    });
  }
}
