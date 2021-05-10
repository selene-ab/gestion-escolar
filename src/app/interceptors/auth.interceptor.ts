import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = this.authService.getSessionToken();
    let request = req;

    if (token) {
      request = req.clone({
        setHeaders: {
          authorization: `Bearer ${token}`,
        },
      });
    }
    return next.handle(request);

    // redirigir al usuario a la página de login cuando el token haya expirado o no tenga un token válido:
    //  return next.handle(request).pipe(
    //   catchError((err: HttpErrorResponse) => {

    //     if (err.status === 401) {
    //       this.router.navigateByUrl('/login');
    //     }

    //     return throwError( err );

    //   })
    // );
  }
}