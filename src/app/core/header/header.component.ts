import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { StoreService } from "src/app/services/store/store.service";
import { MenuOption } from "src/app/types/menu.options";
import { UserWithToken } from "src/app/types/user";
import { menuOptions } from "src/app/utils/config";
@Component({
  selector: "trips-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent {
  menuOptions: MenuOption[];
  currentUser$: Observable<UserWithToken>;
  token = "";
  isOpenMenu = false;
  constructor(public router: Router, private storeService: StoreService) {
    this.menuOptions = menuOptions;
    this.storeService
      .getIsOpenMenu()
      .subscribe((data) => (this.isOpenMenu = data));
    this.currentUser$ = this.storeService.getCurrentUser();
    this.currentUser$.subscribe((data) => (this.token = data.token));
  }

  changeStateMenu() {
    this.storeService.setIsOpenMenu();
  }

  handleHome() {
    if (this.isOpenMenu) {
      this.storeService.setIsOpenMenu();
    }
    this.router.navigateByUrl("trips/alltrips");
  }
}
