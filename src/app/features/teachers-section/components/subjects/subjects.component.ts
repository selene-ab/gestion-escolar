import { Component, OnInit } from "@angular/core";
import { Subject } from "src/app/models/subject";
import { SubjectsService } from "src/app/services/subjects.service";

@Component({
  selector: "app-subjects",
  templateUrl: "./subjects.component.html",
  styleUrls: ["./subjects.component.scss"],
})
export class SubjectsComponent implements OnInit {
  public subjects = [];

  constructor(private subjectsService: SubjectsService) {}

  ngOnInit(): void {
    this.viewSubjects();
  }
  viewSubjects() {
    this.subjectsService.getAllSubjects().subscribe((data: any) => {
      this.subjects = data;
      console.log(this.subjects);
    });
  }
}
