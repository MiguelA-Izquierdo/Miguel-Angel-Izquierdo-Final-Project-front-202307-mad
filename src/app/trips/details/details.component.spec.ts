import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { ActivatedRoute } from "@angular/router";
import { of } from "rxjs";
import { RepoTripsService } from "src/app/services/repo.trips.service/repo.trips.service.service";
import { Travel } from "src/app/types/travel";
import { DetailsComponent } from "./details.component";
describe("Given DetailsComponent", () => {
  let component: DetailsComponent;
  let repoTripsService: RepoTripsService;
  let fixture: ComponentFixture<DetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsComponent],
      imports: [HttpClientTestingModule, MatProgressSpinnerModule],

      providers: [
        {
          repoTripsService: RepoTripsService,
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => "Test", // represents the bookId
              },
            },
          },
        },
      ],
    });
    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    repoTripsService = TestBed.inject(RepoTripsService);
    fixture.detectChanges();
  });

  it("should create", () => {
    spyOn(repoTripsService, "getById").and.returnValue(
      of({ id: "test" } as Travel)
    );
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  describe("When we do click on the button on next the page", () => {
    it("Then currentDay should be 1", () => {
      component.handleNextPage();
      expect(component.currentDay).toBe(1);
    });
  });

  describe("When we do click on the button on previous the page and current day is 1", () => {
    it("Then currentDay should be 0", () => {
      component.currentDay = 1;
      component.handlePreviousPage();
      expect(component.currentDay).toBe(0);
    });
  });
});
