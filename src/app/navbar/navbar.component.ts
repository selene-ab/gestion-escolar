import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppStore } from "../redux/store/app.store";
import { AuthService } from "../services/auth.service";
import * as appActions from "src/app/redux/actions/app.actions";
import { UserInfo } from "../interfaces/user-info";
import { MatDialog } from "@angular/material/dialog";
import { LogoutComponent } from "../features/auth/components/logout/logout.component";
@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class NavbarComponent implements OnInit {
  public menuOpen = false;
  public isLogged = false;
  public user: UserInfo;

  constructor(
    private authService: AuthService,
    private store: Store<{ app: AppStore }>,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.storeSubscribe();
    this.checkSessionStorage();
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  storeSubscribe() {
    this.store.select("app").subscribe((store) => {
      this.isLogged = store.login;
    });
  }

  checkSessionStorage() {
    if (this.authService.isLogged()) {
      this.store.dispatch(appActions.setLoginStatus({ login: true }));
      this.user = this.authService.getUserInfo();
      this.store.dispatch(
        appActions.setUserInfo({
          first_name: this.user.first_name,
          last_name: this.user.last_name,
          role: this.user.role,
        })
      );
    }
  }

  openLogoutDialog() {
    const dialogRef = this.dialog.open(LogoutComponent);
  }
}
