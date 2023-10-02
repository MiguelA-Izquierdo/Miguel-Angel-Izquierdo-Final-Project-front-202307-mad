import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Assessment, Travel } from "src/app/types/travel";
import { starsInitial } from "src/app/utils/config";
import { RepoTripsService } from "../repo.trips.service/repo.trips.service.service";
@Injectable({
  providedIn: "root",
})
export class FormTravelService {
  private stars$: BehaviorSubject<Assessment[]>;
  private newTravel$: BehaviorSubject<Travel>;

  constructor(private repoTrips: RepoTripsService) {
    this.stars$ = new BehaviorSubject<Assessment[]>(starsInitial);
    this.newTravel$ = new BehaviorSubject<Travel>({ days: [{}, {}] } as Travel);
  }

  initializeForm(travel: Travel) {
    const formFirstStep = {
      country: [travel.country, []],
      city: [travel.city, []],
      totalDays: [travel.days, []],
      travellers: [travel.travellers, []],
      budget: [travel.budget, []],
      mainPhoto: ["", []],
    };
    return formFirstStep;
  }

  setStars(stars: Assessment[]) {
    this.stars$.next(stars);
  }

  createTravel(travel: Travel) {
    return this.repoTrips.create(travel);
  }

  updateTravel(travel: Travel, idTravel: string) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, traveler, ...travelToUpdate } = travel;
    return this.repoTrips.update(idTravel, travelToUpdate);
  }

  getStars() {
    return this.stars$.asObservable();
  }

  resetStars() {
    this.stars$.next(starsInitial);
  }

  setTravel(travel: Travel) {
    this.newTravel$.next(travel);
  }

  getTravel() {
    return this.newTravel$.asObservable();
  }

  resetTravel() {
    this.newTravel$.next({} as Travel);
  }

  deleteTravel(id: string) {
    this.repoTrips.delete(id).subscribe();
  }
}
