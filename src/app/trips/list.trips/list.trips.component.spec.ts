import { CommonModule } from "@angular/common";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { of } from "rxjs";
import { RepoTripsService } from "src/app/services/repo.trips.service/repo.trips.service.service";
import { StoreService } from "src/app/services/store/store.service";
import { Travel } from "src/app/types/travel";
import { User } from "src/app/types/user";
import { tripsPage } from "src/app/utils/test.mocks";
import { ListTripsComponent } from "./list.trips.component";

describe("ListTripsComponent", () => {
  let component: ListTripsComponent;
  let fixture: ComponentFixture<ListTripsComponent>;
  let repoTripsService: RepoTripsService;
  let storeService: StoreService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListTripsComponent],
      imports: [
        MatProgressSpinnerModule,
        HttpClientTestingModule,
        CommonModule,
      ],
      providers: [RepoTripsService, StoreService],
    });
    fixture = TestBed.createComponent(ListTripsComponent);
    component = fixture.componentInstance;
    repoTripsService = TestBed.inject(RepoTripsService);
    storeService = TestBed.inject(StoreService);
    fixture.detectChanges();
  });

  it("should create", () => {
    spyOn(repoTripsService, "getAll").and.returnValues(of([{}] as Travel[]));
    spyOn(storeService, "setTrips").and.returnValue();
    expect(component).toBeTruthy();
  });

  describe("When we call handleDelete", () => {
    it("Then the method delete of repoTrips should be called", () => {
      const spyDelete = spyOn(repoTripsService, "delete").and.returnValue(of());
      component.handleDeleteTravel("1");
      expect(spyDelete).toHaveBeenCalled();
    });
  });

  describe("When we change in input owner with checked true", () => {
    it("Then the method getAllFiltered of repoTrips should be called", () => {
      const spyGetallFiltered = spyOn(
        repoTripsService,
        "getAllFiltered"
      ).and.returnValue(of({} as Travel[]));
      spyOn(component, "assignPaginated").and.returnValue([]);
      component.user$ = { id: "1" } as User;
      component.changeInputOwner({
        target: { checked: true },
      } as unknown as Event);
      expect(spyGetallFiltered).toHaveBeenCalled();
    });
  });

  describe("When we change in input owner with checked false", () => {
    it("Then the method getAll of repoTrips should be called", () => {
      const spyGetall = spyOn(repoTripsService, "getAll").and.returnValue(
        of({} as Travel[])
      );
      spyOn(component, "assignPaginated").and.returnValue([]);
      component.user$ = { id: "1" } as User;
      component.changeInputOwner({
        target: { checked: false },
      } as unknown as Event);
      expect(spyGetall).toHaveBeenCalled();
    });
  });

  describe("When we call assignPaginated with 5 objet", () => {
    it("Then the method assignPaginated should be return...", () => {
      const trips = [{}, {}, {}, {}, {}, {}] as Travel[];
      const result = component.assignPaginated(trips);
      expect(result).toEqual(tripsPage);
    });
  });

  describe("When we call assignPaginated with empty array", () => {
    it("Then the method assignPaginated should be return...", () => {
      component.trips = [{}, {}] as Travel[];
      const result = component.assignPaginated([]);
      expect(result).toEqual([{ page: 1 }, { page: 1 }] as Travel[]);
    });
  });

  describe("When we call handleNextPage method and currentPgae < totalpage", () => {
    it("Then the currentPage should be 2", () => {
      component.currentPage = 1;
      component.handleNextPage();
      expect(component.currentPage).toBe(2);
    });
  });

  describe("When we call handleNextPage method and currentPgae = totalpage", () => {
    it("Then the currentPage should be 2", () => {
      component.currentPage = 2;
      component.totalPages = 2;
      component.handleNextPage();
      expect(component.currentPage).toBe(2);
    });
  });

  describe("When we call handlePreviousPage method", () => {
    it("Then the currentPage should be 1", () => {
      component.currentPage = 2;
      component.handlePreviousPage();
      expect(component.currentPage).toBe(1);
    });
  });

  describe("When we call handlePreviousPage method", () => {
    it("Then the currentPage should be 1", () => {
      component.currentPage = 1;
      component.handlePreviousPage();
      expect(component.currentPage).toBe(1);
    });
  });
});
