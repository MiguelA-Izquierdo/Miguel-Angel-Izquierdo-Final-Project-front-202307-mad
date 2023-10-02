import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { ImgData, User, UserWithToken } from "../../types/user";
import { RepoUsersService } from "./repo.users.service";

describe("Given the RepoUsersService", () => {
  let repoUsersService: RepoUsersService;
  const url = "http://localhost:3300" + "/users";
  let httpClientMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    httpClientMock = TestBed.inject(HttpTestingController);
    repoUsersService = TestBed.inject(RepoUsersService);
  });

  afterEach(() => {
    httpClientMock.verify();
  });

  it("should be created", () => {
    expect(repoUsersService).toBeTruthy();
  });

  describe("When the getAll method is called", () => {
    it("Then it should return all users", async () => {
      const mockResp: User[] = [{ userName: "SrIzquierdo" } as User];

      repoUsersService.getAll().subscribe((resp) => {
        expect(resp).not.toBeNull();
        expect(resp).toBe(mockResp);
      });

      const reqGetAll = httpClientMock.expectOne(url);
      expect(reqGetAll.request.method).toEqual("GET");
      reqGetAll.flush(mockResp);
    });
  });

  describe("When the getById method is called", () => {
    it("Then it should return user", async () => {
      const mockResp: User = { id: "1", userName: "SrIzquierdo" } as User;

      repoUsersService.getById("1").subscribe((resp) => {
        expect(resp).not.toBeNull();
        expect(resp).toBe(mockResp);
      });

      const reqGetByID = httpClientMock.expectOne(url + "/" + "1");
      expect(reqGetByID.request.method).toEqual("GET");
      reqGetByID.flush(mockResp);
    });
  });

  describe("When the create method is called", () => {
    it("Then it should return new user", async () => {
      const mockResp: User = {
        avatar: {},
        id: "1",
        userName: "SrIzquierdo",
      } as User;

      repoUsersService
        .create({
          id: "1",
          userName: "SrIzquierdo",
          avatar: {} as ImgData,
        } as unknown as User)
        .subscribe((resp) => {
          expect(resp).not.toBeNull();
          expect(resp).toBe(mockResp);
        });

      const reqCreate = httpClientMock.expectOne(url + "/register");
      expect(reqCreate.request.method).toEqual("POST");
      reqCreate.flush(mockResp);
    });
  });

  describe("When the method update is called", () => {
    it("Then it should return user update", async () => {
      const mockResp: User = { id: "1", userName: "SrIzquierdo" } as User;

      repoUsersService
        .update("1", { userName: "SrIzquierdo" })
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
    it("Then it should return user", async () => {
      const mockResp: User = { id: "1", userName: "SrIzquierdo" } as User;

      repoUsersService.delete("1").subscribe();

      const reqDelete = httpClientMock.expectOne(url + "/1");
      expect(reqDelete.request.method).toEqual("DELETE");
      reqDelete.flush(mockResp);
    });
  });

  describe("When the method login is called whith correct data", () => {
    it("Then request method patch should be called", async () => {
      const mockResp: User = {} as UserWithToken;

      repoUsersService.login({} as UserWithToken).subscribe((resp) => {
        expect(resp).not.toBeNull();
      });

      const reqLogin = httpClientMock.expectOne(url + "/login");
      expect(reqLogin.request.method).toEqual("PATCH");
      reqLogin.flush(mockResp);
    });
  });

  describe("When the uploadImg method is called", () => {
    it("Then it should return a ImgData", async () => {
      const mockResp: ImgData = { url: "url-Test" } as ImgData;

      repoUsersService.uploadImg({} as FormData).subscribe((resp) => {
        expect(resp).not.toBeNull();
        expect(resp).toBe(mockResp);
      });

      const reqGetByID = httpClientMock.expectOne(url + "/uploadphoto");
      expect(reqGetByID.request.method).toEqual("POST");
      reqGetByID.flush(mockResp);
    });
  });
});
