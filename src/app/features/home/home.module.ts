import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MaterialModule } from "../../material.module";
import { HomePageComponent } from "./components/home-page/home-page.component";
import { AppRoutingModule } from "src/app/app-routing.module";

@NgModule({
  declarations: [HomePageComponent],
  imports: [CommonModule, MaterialModule, AppRoutingModule],
})
export class HomeModule {}
