import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DetailsComponent } from "./details/details.component";
import { FormTravelComponent } from "./form.travel/form.travel.component";
import { ListTripsComponent } from "./list.trips/list.trips.component";

const routes: Routes = [
  { path: "addtravel", component: FormTravelComponent },
  { path: "updatetravel/:id", component: FormTravelComponent },
  { path: "updatetravel", component: FormTravelComponent },
  { path: "alltrips", component: ListTripsComponent },
  { path: "travel/:id", component: DetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TripsRoutingModule {}
