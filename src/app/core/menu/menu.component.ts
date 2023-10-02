import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";
import { StoreService } from "src/app/services/store/store.service";
import { MenuOption } from "src/app/types/menu.options";
import { UserWithToken } from "src/app/types/user";

@Component({
  selector: "trips-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.scss"],
})
export class MenuComponent {
  @Input() menuOptions!: MenuOption[];
  currentUser$: UserWithToken;
  constructor(private storeService: StoreService, public router: Router) {
    this.currentUser$ = {} as UserWithToken;
    storeService
      .getCurrentUser()
      .subscribe((data) => (this.currentUser$ = data));
  }

  handleLogin() {
    this.changeStateMenu();
    this.router.navigateByUrl("users/login");
  }

  handleLogout() {
    localStorage.clear();
    this.changeStateMenu();
    this.router.navigateByUrl("home");
    this.storeService.setCurrentUser({} as UserWithToken);
  }

  changeStateMenu() {
    this.storeService.setIsOpenMenu();
  }
}
