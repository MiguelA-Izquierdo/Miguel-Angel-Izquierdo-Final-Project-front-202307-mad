import { Component, Input } from "@angular/core";
import { FormTravelService } from "src/app/services/form-travel.service/form-travel.service";
import { Assessment, Travel } from "src/app/types/travel";

@Component({
  selector: "trips-starsreview",
  templateUrl: "./stars.review.component.html",
  styleUrls: ["./stars.review.component.scss"],
})
export class StarsReviewComponent {
  @Input() stars!: Assessment[];
  starsState: Assessment[] = [];
  newTravel: Travel = {} as Travel;
  constructor(private formTravelService: FormTravelService) {
    this.formTravelService
      .getStars()
      .subscribe((data) => (this.starsState = data));
  }
  handleStar(event: Event) {
    const liElement = event.target as HTMLLIElement;
    this.starsState = this.starsState.map((star) => {
      return liElement.value >= star.position
        ? { ...star, state: true }
        : { ...star, state: false };
    });

    this.formTravelService.setStars(this.starsState);
  }
}
