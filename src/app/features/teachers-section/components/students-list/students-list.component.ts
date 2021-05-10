import { Component, OnInit } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import { StudentsService } from "src/app/services/students.service";

@Component({
  selector: "app-students-list",
  templateUrl: "./students-list.component.html",
  styleUrls: ["./students-list.component.scss"],
})
export class StudentsListComponent implements OnInit {
  public students = [];
  public list = [];
  public columnsToDisplay = ["id", "nombre", "apellido", "clase", "profesor"];
  public pageSize = 5;

  constructor(private studentsService: StudentsService) {}

  ngOnInit(): void {
    this.viewStudentList();
  }

  viewStudentList() {
    this.studentsService.getStudentsList().subscribe((data: any) => {
      this.students = data;
      this.list = this.getPageItems(0, this.pageSize);
    });
  }

  getPageItems(page, pageSize) {
    let start = page * pageSize;
    let end = start + pageSize;
    return this.students.slice(start, end);
  }

  paginatorEvent(event: PageEvent) {
    this.list = this.getPageItems(event.pageIndex, event.pageSize);
  }
}
