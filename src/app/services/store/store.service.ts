import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Travel } from "src/app/types/travel";
import { UserWithToken } from "src/app/types/user";

@Injectable({
  providedIn: "root",
})
export class StoreService {
  private trips$: BehaviorSubject<Travel[]>;
  private currentUser$: BehaviorSubject<UserWithToken>;
  private isOpenMenu$: BehaviorSubject<boolean>;
  constructor() {
    this.currentUser$ = new BehaviorSubject<UserWithToken>({} as UserWithToken);
    this.isOpenMenu$ = new BehaviorSubject<boolean>(false);
    this.trips$ = new BehaviorSubject<Travel[]>([]);
  }

  setTrips(trips: Travel[]) {
    this.trips$.next(trips);
  }

  getTrips() {
    return this.trips$.asObservable();
  }
  setCurrentUser(user: UserWithToken) {
    this.currentUser$.next(user);
  }

  getCurrentUser() {
    return this.currentUser$.asObservable();
  }

  setIsOpenMenu() {
    this.isOpenMenu$.next(!this.isOpenMenu$.value);
  }

  getIsOpenMenu() {
    return this.isOpenMenu$.asObservable();
  }
}
