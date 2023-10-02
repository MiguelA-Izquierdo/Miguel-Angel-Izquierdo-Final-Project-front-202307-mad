import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { of } from "rxjs";
import { RepoTripsService } from "../repo.trips.service/repo.trips.service.service";
import { MediaFileService } from "./media.file.service";

describe("MediaFileService", () => {
  let service: MediaFileService;
  let repoTripsService: RepoTripsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RepoTripsService],
    });
    service = TestBed.inject(MediaFileService);
    repoTripsService = TestBed.inject(RepoTripsService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  describe("When we call uploadFile Method", () => {
    it("The method uploadImg from repotrips shoul be called", () => {
      const spyUploadFiles = spyOn(
        repoTripsService,
        "uploadImg"
      ).and.returnValue(of());

      service.ulploadFile(
        { target: { files: [{}] } } as unknown as Event,
        repoTripsService
      );
      expect(spyUploadFiles).toHaveBeenCalled();
    });
  });

  describe("When we call uploadFile Method without file", () => {
    it("The method uploadImg from repotrips not shoul be called", () => {
      service.ulploadFile({ target: {} } as unknown as Event, repoTripsService);
      expect(service).toBeTruthy();
    });
  });

  describe("When we call uploadFiles method", () => {
    it("The method uploadImg from repotrips shoul be called", () => {
      const spyUploadFiles = spyOn(
        repoTripsService,
        "uploadMultipleImg"
      ).and.returnValue(of());

      service.ulploadFiles(
        { target: { files: [{}] } } as unknown as Event,
        repoTripsService
      );
      expect(spyUploadFiles).toHaveBeenCalled();
    });
  });
});
