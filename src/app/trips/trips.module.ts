import { CommonModule, NgOptimizedImage } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { CardComponent } from "./card/card.component";
import { DetailsComponent } from "./details/details.component";
import { FormTravelComponent } from "./form.travel/form.travel.component";
import { ListTripsComponent } from "./list.trips/list.trips.component";
import { StarsReviewComponent } from "./stars.review/stars.review.component";
import { TripsRoutingModule } from "./trips-routing.module";
@NgModule({
  declarations: [
    FormTravelComponent,
    ListTripsComponent,
    CardComponent,
    DetailsComponent,
    StarsReviewComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TripsRoutingModule,
    NgOptimizedImage,
    MatProgressSpinnerModule,
  ],
  exports: [],
})
export class TripsModule {}
