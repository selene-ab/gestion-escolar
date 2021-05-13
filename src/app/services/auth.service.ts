import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { Loggin } from "../interfaces/loggin";
import { RestorePassword } from "../interfaces/restore-password";
import { User } from "../models/user";
import jwt_decode from "jwt-decode";
import { Store } from "@ngrx/store";
import * as appActions from "src/app/redux/actions/app.actions";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private http: HttpClient, private store: Store) {}

  // Método para registrar un usuario en la pagina
  registerUser(user: User) {
    return this.http.post(environment.urlStudents + "register", user);
  }

  // Obtener un token al ingresar user y password, http post a /login
  loggin(user: Loggin) {
    return this.http.post(environment.urlStudents + "login", user).pipe(
      map((response: any) => {
        if (!response.error) {
          this.saveSessionToken(response.token);
          this.saveDecodedToken(response.token);
          return response;
        } else {
          return response;
        }
      })
    );
  }

  // Obtener y guardar info del token
  saveDecodedToken(token: string) {
    const decodedToken: any = jwt_decode(token);
    console.log(decodedToken);
    localStorage.setItem("user", JSON.stringify(decodedToken));
    this.store.dispatch(
      appActions.setUserInfo({
        first_name: decodedToken.first_name,
        last_name: decodedToken.last_name,
        role: decodedToken.role,
      })
    );
  }

  // Restaurar una contraseña
  restorePassword(info: RestorePassword) {}

  // Almacenar el token en el navegador, con el local storage
  saveSessionToken(token: string) {
    localStorage.setItem("session", token);
    this.store.dispatch(appActions.setLoginStatus({ login: true }));
  }

  // Borrar un token del navegador
  forgetSessionToken() {
    localStorage.removeItem("session");
    localStorage.removeItem("user");
    this.store.dispatch(appActions.resetUserSession());
  }

  // Recuperar un token guardado en el navegador
  getSessionToken() {
    return localStorage.getItem("session");
  }

  // Recuperar usuario guardado en el navegador
  getUserInfo() {
    return JSON.parse(localStorage.getItem("user"));
  }

  // Comprobar si existe el token en el navegador o no(comprobar si el user tiene sesion iniciada)
  isLogged() {
    return localStorage.getItem("session") ? true : false;
  }

  // Comprobar si el usuario tiene el rol de profesor
  isTeacher() {
    let user = this.getUserInfo();
    return user.role == "teacher" ? true : false;
  }

  // Comprobar si el usuario tiene el rol de alumno
  isStudent() {
    let user = this.getUserInfo();
    return user.role == "student" ? true : false;
  }
}
