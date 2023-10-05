import { ComponentFixture, TestBed } from "@angular/core/testing";

import { NgOptimizedImage } from "@angular/common";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { Activity, Travel } from "src/app/types/travel";
import { DetailsComponent } from "../details/details.component";
import { CardComponent } from "./card.component";

describe("CardComponent", () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardComponent],
      imports: [
        NgOptimizedImage,
        HttpClientTestingModule,
        RouterModule.forRoot([
          { path: "trips/updatetravel/", component: DetailsComponent },
        ]),
      ],
      providers: [
        Router,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => "1", // represents the bookId
              },
            },
          },
        },
      ],
    });

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    component.travel = {
      id: "1",
      budget: 200,
      mainPhoto: { url: "test" },
      days: [
        {
          activities: [
            {
              photos: [{ url: "test", urlCard: "test" }],
            } as unknown as Activity,
          ],
        },
      ],
      traveler: { username: "Username test" },
    } as unknown as Travel;
    component.travel.id = "test";
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("When we call handleDelete", () => {
    it("Then deleteTravel method shoul be called", () => {
      const spyDelete = spyOn(component.deleteTravel, "next");
      component.travel.id = "";
      component.handleDelete();
      component.travel.id = "test";
      component.handleDelete();
      expect(spyDelete).toHaveBeenCalled();
    });
  });

  describe("When we call handleModify", () => {
    it("Then navigate method shoul be called", () => {
      const spyNavigate = spyOn(
        component.router,
        "navigateByUrl"
      ).and.returnValue({} as unknown as Promise<true>);
      component.travel.id = "";
      component.handleModify();
      component.travel.id = "test";
      component.handleModify();
      expect(spyNavigate).toHaveBeenCalled();
    });
  });
});
