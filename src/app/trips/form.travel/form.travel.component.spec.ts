import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { of } from "rxjs";
import { HomeComponent } from "src/app/home/home.component";
import { FormTravelService } from "src/app/services/form-travel.service/form-travel.service";
import { MediaFileService } from "src/app/services/media.files/media.file.service";
import { RepoTripsService } from "src/app/services/repo.trips.service/repo.trips.service.service";
import { DayTravel, Travel } from "src/app/types/travel";
import { ImgData } from "src/app/types/user";
import { mockFirstStepForm } from "src/app/utils/test.mocks";
import { StarsReviewComponent } from "../stars.review/stars.review.component";
import { FormTravelComponent } from "./form.travel.component";
describe("Given form component without params", () => {
  let component: FormTravelComponent;
  let repoTripsService: RepoTripsService;
  let mediaFileService: MediaFileService;
  let formTravelService: FormTravelService;
  let fixture: ComponentFixture<FormTravelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormTravelComponent, StarsReviewComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: "home", component: HomeComponent },
        ]),
      ],
      providers: [RepoTripsService, MediaFileService],
    });
    fixture = TestBed.createComponent(FormTravelComponent);
    component = fixture.componentInstance;
    repoTripsService = TestBed.inject(RepoTripsService);
    formTravelService = TestBed.inject(FormTravelService);
    mediaFileService = TestBed.inject(MediaFileService);
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("When the component is called without params", () => {
    describe("When we do submit in firstStepForm", () => {
      it("Then currentStep should be 2", () => {
        component.firstStepForm.setValue(mockFirstStepForm);
        component.firstStepForm.updateValueAndValidity();
        component.newTravel.totalDays = 2;
        component.newTravel.days = [] as DayTravel[];
        component.mainPhoto = { url: "test-Url" } as ImgData;
        component.handleSubmitFirstStep();
        expect(component.currentStep).toBe(2);
      });
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

    describe("When we do click on button add travel", () => {
      it("Then repoTravels.create should be called", () => {
        const spyCreate = spyOn(repoTripsService, "create").and.returnValue(
          of({} as Travel)
        );

        component.handleCreateTravel();
        expect(spyCreate).toHaveBeenCalled();
      });
    });

    describe("When we do click on button add add activity", () => {
      it("Then resetStars should be called", () => {
        const spyReset = spyOn(
          formTravelService,
          "resetStars"
        ).and.returnValue();
        component.newTravel.days[0].activities = [];
        component.starsState = [];
        component.handleSubmitActivity();
        expect(spyReset).toHaveBeenCalled();
      });
    });

    describe("When we change input mainPhoto", () => {
      it("Then uploadFile of mediaFiles service should be called", () => {
        const spyuploadFile = spyOn(
          mediaFileService,
          "ulploadFile"
        ).and.returnValue(of({} as ImgData));
        component.changeMainPhoto({} as Event);
        expect(spyuploadFile).toHaveBeenCalled();
      });
    });

    describe("When we change input photos", () => {
      it("Then uploadFiles of mediaFiles service should be called", () => {
        const spyuploadFiles = spyOn(
          mediaFileService,
          "ulploadFiles"
        ).and.returnValue(of([{} as ImgData]));
        component.changeInputPhotos({} as Event);
        expect(spyuploadFiles).toHaveBeenCalled();
      });
    });
  });
});

describe("Given formcomponent with params", () => {
  let componentWithParams: FormTravelComponent;
  let repoTrips: RepoTripsService;
  let fixture: ComponentFixture<FormTravelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormTravelComponent, StarsReviewComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: "home", component: HomeComponent },
        ]),
      ],
      providers: [
        RepoTripsService,
        MediaFileService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => "1",
              },
            },
          },
        },
      ],
    });

    fixture = TestBed.createComponent(FormTravelComponent);
    componentWithParams = fixture.componentInstance;
    repoTrips = TestBed.inject(RepoTripsService);
    repoTrips = TestBed.inject(RepoTripsService);
    fixture.detectChanges();
  });

  it("The component should create", () => {
    const spyInitializeForm = spyOn(componentWithParams, "initializeForm");
    spyOn(repoTrips, "getById").and.returnValue(
      of({ mainPhoto: "Test-foto" } as unknown as Travel)
    );
    componentWithParams.ngOnInit();
    expect(spyInitializeForm).toHaveBeenCalled();
    expect(componentWithParams).toBeTruthy();
  });

  describe("When we call the method initializeForm", () => {
    it("Then repoTrips.getById should be called", () => {
      const spyGetById = spyOn(repoTrips, "getById").and.returnValue(
        of({ mainPhoto: "Test-foto" } as unknown as Travel)
      );
      componentWithParams.initializeForm();
      expect(spyGetById).toHaveBeenCalled();
    });
  });
  describe("When we call handleSubmitFirstStep form", () => {
    it("Then currentStep should be 2", () => {
      componentWithParams.firstStepForm.setValue(mockFirstStepForm);
      componentWithParams.firstStepForm.updateValueAndValidity();
      componentWithParams.mainPhoto = { url: "test-Url" } as ImgData;

      componentWithParams.handleSubmitFirstStep();
      expect(componentWithParams.currentStep).toBe(2);
    });
  });

  describe("When we do click on button modify travel", () => {
    it("Then repoTravels.create should be called", () => {
      const spyUpdate = spyOn(repoTrips, "update").and.returnValue(
        of({} as Travel)
      );

      componentWithParams.handleCreateTravel();
      expect(spyUpdate).toHaveBeenCalled();
    });
  });
});
