import { TestBed } from "@angular/core/testing";

import { HttpClientTestingModule } from "@angular/common/http/testing";
import { mockFirstStepForm } from "src/app/utils/test.mocks";
import { RepoTripsService } from "../repo.trips.service/repo.trips.service.service";
import { FormTravelService } from "./form-travel.service";

describe("FormTravelService", () => {
  let service: FormTravelService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RepoTripsService],
    });
    service = TestBed.inject(FormTravelService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  describe("When the method initializeForm with a travel", () => {
    it("The method should return a formGroup with trip details", () => {
      const mockTravel = mockFirstStepForm;
      const result = service.initializeForm(mockTravel);
      expect(result.city).toEqual(["test-City", []]);
    });
  });
});
