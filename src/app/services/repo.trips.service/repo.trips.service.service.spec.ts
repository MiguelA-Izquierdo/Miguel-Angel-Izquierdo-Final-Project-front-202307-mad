import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";

import { Travel } from "../../types/travel";
import { ImgData } from "../../types/user";
import { RepoTripsService } from "./repo.trips.service.service";

describe("Given the RepoTripsServiceService", () => {
  let repoTripsService: RepoTripsService;
  const url = "http://localhost:3300" + "/trips";
  let httpClientMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    httpClientMock = TestBed.inject(HttpTestingController);
    repoTripsService = TestBed.inject(RepoTripsService);
  });

  afterEach(() => {
    httpClientMock.verify();
  });

  it("should be created", () => {
    expect(repoTripsService).toBeTruthy();
  });

  describe("When the getAll method is called", () => {
    it("Then it should return all trips", async () => {
      const mockResp: Travel[] = [{ city: "Test-City" } as Travel];

      repoTripsService.getAll().subscribe((resp) => {
        expect(resp).not.toBeNull();
        expect(resp).toBe(mockResp);
      });

      const reqGetAll = httpClientMock.expectOne(url);
      expect(reqGetAll.request.method).toEqual("GET");
      reqGetAll.flush(mockResp);
    });
  });

  describe("When the getAllFiltered method is called", () => {
    it("Then it should return all trips gilterd by user.id", async () => {
      const mockResp: Travel[] = [{ city: "Test-City" } as Travel];

      repoTripsService
        .getAllFiltered({ key: "id", value: "test" })
        .subscribe((resp) => {
          expect(resp).not.toBeNull();
          expect(resp).toBe(mockResp);
        });

      const reqgetAllFiltered = httpClientMock.expectOne(url + "/filter");
      expect(reqgetAllFiltered.request.method).toEqual("POST");
      reqgetAllFiltered.flush(mockResp);
    });
  });

  describe("When the getById method is called", () => {
    it("Then it should return travel", async () => {
      const mockResp: Travel = { id: "1", city: "Test-City" } as Travel;

      repoTripsService.getById("1").subscribe((resp) => {
        expect(resp).not.toBeNull();
        expect(resp).toBe(mockResp);
      });

      const reqGetByID = httpClientMock.expectOne(url + "/" + "1");
      expect(reqGetByID.request.method).toEqual("GET");
      reqGetByID.flush(mockResp);
    });
  });

  describe("When the create method is called", () => {
    it("Then it should return new travel", async () => {
      const mockResp: Travel = {
        id: "1",
        city: "Test-City",
      } as Travel;

      repoTripsService
        .create({
          id: "1",
          city: "Test-City",
        } as Travel)
        .subscribe((resp) => {
          expect(resp).not.toBeNull();
          expect(resp).toBe(mockResp);
        });

      const reqCreate = httpClientMock.expectOne(url);
      expect(reqCreate.request.method).toEqual("POST");
      reqCreate.flush(mockResp);
    });
  });

  describe("When the method update is called", () => {
    it("Then it should return user update", async () => {
      const mockResp: Travel = {
        id: "1",
        city: "Test-City",
      } as Travel;

      repoTripsService
        .update("1", {
          id: "1",
          city: "Test-City",
        })
        .subscribe((resp) => {
          expect(resp).not.toBeNull();
          expect(resp).toBe(mockResp);
        });

      const reqUpdate = httpClientMock.expectOne(url + "/1");
      expect(reqUpdate.request.method).toEqual("PATCH");
      reqUpdate.flush(mockResp);
    });
  });

  describe("When the method delete is called", () => {
    it("Then it should request method to equal delete", async () => {
      repoTripsService.delete("1").subscribe();

      const reqDelete = httpClientMock.expectOne(url + "/1");
      expect(reqDelete.request.method).toEqual("DELETE");
    });
  });
  describe("When the uploadImg method is called", () => {
    it("Then it should return a ImgData", async () => {
      const mockResp: ImgData = { url: "url-Test" } as ImgData;

      repoTripsService.uploadImg({} as FormData).subscribe((resp) => {
        expect(resp).not.toBeNull();
        expect(resp).toBe(mockResp);
      });

      const reqGetByID = httpClientMock.expectOne(url + "/uploadphoto");
      expect(reqGetByID.request.method).toEqual("POST");
      reqGetByID.flush(mockResp);
    });
  });

  describe("When the uploadMultipleImg method is called", () => {
    it("Then it should return a Array ImgData", async () => {
      const mockResp: ImgData[] = [{ url: "url-Test" }] as ImgData[];

      repoTripsService.uploadMultipleImg({} as FormData).subscribe((resp) => {
        expect(resp).not.toBeNull();
        expect(resp).toBe(mockResp);
      });

      const reqGetByID = httpClientMock.expectOne(url + "/uploadphotos");
      expect(reqGetByID.request.method).toEqual("POST");
      reqGetByID.flush(mockResp);
    });
  });
});
