import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import { Student } from "src/app/models/student";
import { SubjectsService } from "src/app/services/subjects.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ExamsService } from "src/app/services/exams.service";
import { Subject } from "src/app/models/subject";
import { NewExam } from "src/app/interfaces/new-exam";
import * as moment from "moment";

@Component({
  selector: "app-student-view-exams",
  templateUrl: "./student-view-exams.component.html",
  styleUrls: ["./student-view-exams.component.scss"],
})
export class StudentViewExamsComponent implements OnInit, OnChanges {
  @Input() public student: Student;
  public exams = [];
  public subjects: [Subject];
  public columnsToExams: Array<string> = [
    "id",
    "subject",
    "date",
    "qualification",
  ];
  public examForm: FormGroup;
  public success: boolean = false;
  public passedExams: number = 0;
  public failedExams: number = 0;
  public averageGrade: number;

  constructor(
    private subjectsService: SubjectsService,
    private examsService: ExamsService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.viewSubjects();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.student) {
      this.viewStudentExams(changes.student.currentValue.id);
    }
  }

  initForm() {
    this.examForm = new FormGroup({
      subject: new FormControl("", [Validators.required]),
      examDate: new FormControl("", [Validators.required]),
      score: new FormControl("", [Validators.required]),
    });
  }

  viewSubjects() {
    this.subjectsService.getAllSubjects().subscribe((data: any) => {
      this.subjects = data;
    });
  }

  saveExam() {
    let json: NewExam = {
      student: this.student.id,
      subject: this.examForm.get("subject").value,
      qualification: this.examForm.get("score").value,
      time: moment(this.examForm.get("examDate").value).format(
        "YYYY-MM-DD 	HH:mm:00"
      ),
    };
    this.examsService.setExamScores(json).subscribe((result: any) => {
      console.log(result);
      if (result.success) {
        // Añadir el examen recien creado a la tabla de examenes
        // Buscamos la asignatura por el id
        let examSubject = this.subjects.find((item) => {
          return item.id == json.subject;
        });
        //Creamos el examen nuevo
        let newExam = {
          subject: examSubject.name,
          id: result.exam_id,
          date: json.time,
          qualification: json.qualification,
        };
        // Clonamos el array para tener una variable nueva y le añadimos el nuevo examen
        let clonedArray = [...this.exams];
        clonedArray.push(newExam);
        // Cambiamos el contenido de la variable exams para que angular refresque la tabla
        this.exams = clonedArray;
        // Mostramos notificacion
        this.success = true;
        setTimeout(() => {
          this.success = false;
        }, 3500);
        // Ponemos los contadores de examenes a 0 y volvemos a llamar a las funciones
        this.passedExams = 0;
        this.failedExams = 0;
        this.getPassedAndFailingGrades();
        this.calculateAverageGrade();
        this.examForm.reset();
      }
    });
  }

  viewStudentExams(id: number) {
    this.examsService.getStudentExamsbyID(id).subscribe((data: any) => {
      this.exams = data;
      console.log(data);
      this.getPassedAndFailingGrades();
      this.calculateAverageGrade();
    });
  }

  getPassedAndFailingGrades() {
    this.exams.forEach((exam: any) => {
      if (exam.qualification >= 5) {
        this.passedExams += 1;
      } else {
        this.failedExams += 1;
      }
    });
  }

  calculateAverageGrade() {
    let sumOfGrades = 0;
    this.exams.forEach((exam: any) => {
      sumOfGrades += exam.qualification;
    });
    this.averageGrade = Math.round((sumOfGrades / this.exams.length) * 10) / 10;
    console.log("notas", sumOfGrades);
    console.log("redondeada", this.averageGrade);
  }
}
