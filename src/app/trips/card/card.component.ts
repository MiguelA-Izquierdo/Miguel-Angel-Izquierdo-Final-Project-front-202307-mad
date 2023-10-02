import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { FormTravelService } from "src/app/services/form-travel.service/form-travel.service";
import { StoreService } from "src/app/services/store/store.service";
import { Travel } from "src/app/types/travel";
import { User } from "src/app/types/user";
@Component({
  selector: "trips-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.scss"],
})
export class CardComponent implements OnInit {
  @Input() travel!: Travel;
  @Output() deleteTravel: EventEmitter<string>;
  user$: User;
  constructor(
    private storeService: StoreService,
    private formTravelService: FormTravelService,
    public router: Router
  ) {
    this.deleteTravel = new EventEmitter();
    this.user$ = {} as User;
  }

  ngOnInit(): void {
    this.storeService.getCurrentUser().subscribe((user) => {
      this.user$ = user.user;
    });
  }

  handleDelete() {
    if (!this.travel.id) return;
    this.deleteTravel.next(this.travel.id);
  }

  handleModify() {
    if (!this.travel.id) return;
    this.router.navigateByUrl(`trips/updatetravel/${this.travel.id}`);
  }
}
