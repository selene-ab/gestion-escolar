import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-teachers-home",
  templateUrl: "./teachers-home.component.html",
  styleUrls: ["./teachers-home.component.scss"],
})
export class TeachersHomeComponent implements OnInit {
  public menuOpen = false;
  constructor() {}
  public menuItems = [
    {
      name: "Inicio",
      path: "perfil",
    },
    {
      name: "Alumnos",
      path: "alumnos",
    },
    {
      name: "Clases",
      path: "clases",
    },
    {
      name: "Asignaturas",
      path: "asignaturas",
    },
    {
      name: "Calificaciones",
      path: "examenes/poner-notas",
    },
    {
      name: "Nueva tarea",
      path: "tareas/crear",
    },
    {
      name: "Nuevo alumno",
      path: "crear-alumno",
    },
    {
      name: "Nueva clase",
      path: "clases/crear-clase",
    },
    {
      name: "Nueva asignatura",
      path: "asignaturas/crear",
    },
  ];
  ngOnInit(): void {}

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}
