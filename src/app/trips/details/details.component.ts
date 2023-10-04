import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { RepoTripsService } from "src/app/services/repo.trips.service/repo.trips.service.service";
import { Travel } from "src/app/types/travel";

@Component({
  selector: "trips-details",
  templateUrl: "./details.component.html",
  styleUrls: ["./details.component.scss"],
})
export class DetailsComponent implements OnInit {
  travel: Travel;
  currentDay = 0;
  travelIdParams: string;
  stateTravel: "loading" | "loaded" = "loading";
  constructor(
    private repoTrips: RepoTripsService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.travel = {} as Travel;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.travelIdParams = this.route.snapshot.paramMap.get("id")!;
  }

  ngOnInit(): void {
    this.repoTrips.getById(this.travelIdParams).subscribe((data) => {
      this.travel = data;
      this.stateTravel = "loaded";
    });
  }
  handleNextPage() {
    this.currentDay++;
  }

  handlePreviousPage() {
    this.currentDay--;
  }
}
