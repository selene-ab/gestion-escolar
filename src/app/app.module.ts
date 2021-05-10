import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "./material.module";
import { HomeModule } from "./features/home/home.module";
import { TeachersSectionModule } from "./features/teachers-section/teachers-section.module";
import { StudentsSectionModule } from "./features/students-section/students-section.module";
import { AuthModule } from "./features/auth/auth.module";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthGuard } from "./guards/auth.guard";
import { AuthInterceptor } from "./interceptors/auth.interceptor";
import { StoreModule } from "@ngrx/store";
import { reducers } from "./redux/reducers";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [AppComponent, NavbarComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HomeModule,
    TeachersSectionModule,
    StudentsSectionModule,
    AuthModule,
    HttpClientModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({
      name: "gestionEscolar",
      maxAge: 25,
    }),
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
