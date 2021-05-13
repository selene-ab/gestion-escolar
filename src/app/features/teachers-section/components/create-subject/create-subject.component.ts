import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { CreateSubject } from "src/app/interfaces/create-subject";
import { SubjectsService } from "src/app/services/subjects.service";

@Component({
  selector: "app-create-subject",
  templateUrl: "./create-subject.component.html",
  styleUrls: ["./create-subject.component.scss"],
})
export class CreateSubjectComponent implements OnInit {
  public subjectForm: FormGroup;
  public success: boolean = false;

  constructor(private subjectsService: SubjectsService) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.subjectForm = new FormGroup({
      name: new FormControl("", [Validators.required]),
    });
  }

  createSubject() {
    let json: CreateSubject = {
      name: this.subjectForm.get("name").value,
    };
    this.subjectsService.createNewSubject(json).subscribe((result: any) => {
      console.log(result);
      if (result.success) {
        this.success = true;

        setTimeout(() => {
          this.success = false;
        }, 3500);

        this.subjectForm.reset();
      }
    });
  }
}
