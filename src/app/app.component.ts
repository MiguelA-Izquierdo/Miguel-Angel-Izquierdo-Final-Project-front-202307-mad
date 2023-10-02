import { Component, OnInit } from "@angular/core";
import { StoreService } from "./services/store/store.service";

@Component({
  selector: "trips-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "miguel-Angel-Izquierdo-Final-Project-front-202307-mad";

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    this.getUserInfo();
  }

  getUserInfo() {
    const token = localStorage.getItem("Token");
    if (!token) return;

    const currentUser = JSON.parse(token);
    this.storeService.setCurrentUser(currentUser);
  }
}
