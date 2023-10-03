import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { RepoTripsService } from "src/app/services/repo.trips.service/repo.trips.service.service";
import { StoreService } from "src/app/services/store/store.service";
import { Travel } from "src/app/types/travel";
import { User } from "src/app/types/user";

@Component({
  selector: "trips-list.trips",
  templateUrl: "./list.trips.component.html",
  styleUrls: ["./list.trips.component.scss"],
})
export class ListTripsComponent implements OnInit {
  trips: Travel[];
  suscriptionTrips = new Subscription();
  user$: User;
  stateList: "loading" | "loaded" = "loading";
  currentPage = 1;
  totalPages = 0;

  constructor(
    private storeService: StoreService,
    private repoTrips: RepoTripsService
  ) {
    this.user$ = {} as User;
    this.trips = [];
    this.storeService.getTrips().subscribe((data) => (this.trips = data));
  }

  ngOnInit(): void {
    this.storeService.getCurrentUser().subscribe((user) => {
      this.user$ = user.user;
    });
    this.repoTrips.getAll().subscribe((data) => {
      this.stateList = "loaded";
      data = this.assignPaginated(data);
      this.storeService.setTrips(data);
    });
  }
  changeInputOwner(event: Event) {
    if (!this.user$.id) return;

    if ((event.target as HTMLInputElement).checked) {
      this.suscriptionTrips.unsubscribe();
      this.suscriptionTrips = this.repoTrips
        .getAllFiltered({
          key: "traveler",
          value: this.user$.id,
        })
        .subscribe((travels) => {
          this.currentPage = 1;
          this.trips = this.assignPaginated(travels);
        });
    } else {
      this.suscriptionTrips.unsubscribe();
      this.suscriptionTrips = this.repoTrips.getAll().subscribe((trips) => {
        this.stateList = "loaded";
        trips = this.assignPaginated(trips);
        this.storeService.setTrips(trips);
      });
    }
  }

  handleDeleteTravel(travelId: string) {
    this.repoTrips
      .delete(travelId)
      .subscribe(() =>
        this.storeService.setTrips(
          this.assignPaginated(
            this.trips.filter((travel) => travel.id !== travelId)
          )
        )
      );
  }

  handleNextPage() {
    if (this.currentPage === this.totalPages) return;
    this.currentPage++;
  }

  handlePreviousPage() {
    if (this.currentPage === 1) return;
    this.currentPage--;
  }

  assignPaginated = (tripsArray: Travel[]) => {
    const tripsPerPage = 5;
    let allTrips = 0;
    let page = 1;

    if (!tripsArray.length) {
      tripsArray = this.trips;
    }
    tripsArray = tripsArray.map((country) => {
      if (allTrips === tripsPerPage) {
        allTrips = 1;
        page++;
      } else {
        allTrips++;
      }

      country.page = page;
      return country;
    });

    this.totalPages = tripsArray[tripsArray.length - 1].page as number;
    return tripsArray;
  };
}
