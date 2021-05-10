import { Component, OnInit } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import { ClassroomsService } from "src/app/services/classrooms.service";

@Component({
  selector: "app-classroom-lists",
  templateUrl: "./classroom-lists.component.html",
  styleUrls: ["./classroom-lists.component.scss"],
})
export class ClassroomListsComponent implements OnInit {
  public classroomInfo = [];
  public classroomList = [];
  public listPerPage = [];
  public columnsToClassrooms = ["id", "nombre", "apellido", "profesor"];
  public pageSize = 5;
  constructor(private classroomsService: ClassroomsService) {}

  ngOnInit(): void {
    this.viewClassrooms();
  }

  viewClassrooms() {
    this.classroomsService.getClassrooms().subscribe((data: any) => {
      this.classroomInfo = data;
    });
  }

  viewStudentsByClassroom(classroom: number) {
    this.classroomsService
      .getListsByClassrooms(classroom)
      .subscribe((data: any) => {
        this.classroomList = data;
        this.listPerPage = this.getPageItems(0, this.pageSize);
      });
  }

  getPageItems(page, pageSize) {
    let start = page * pageSize;
    let end = start + pageSize;
    return this.classroomList.slice(start, end);
  }

  paginatorEvent(event: PageEvent) {
    this.listPerPage = this.getPageItems(event.pageIndex, event.pageSize);
  }
}
