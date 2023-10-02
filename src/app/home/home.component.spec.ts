import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { RouterTestingModule } from "@angular/router/testing";
import { ListTripsComponent } from "../trips/list.trips/list.trips.component";
import { HomeComponent } from "./home.component";

describe("HomeComponent", () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [
        HttpClientModule,
        CommonModule,
        RouterTestingModule.withRoutes([
          { path: "trips/alltrips", component: ListTripsComponent },
        ]),
      ],
    });
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    component.handleExplore();
    expect(component).toBeTruthy();
  });
});
