import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import { of } from "rxjs";
import { MediaFileService } from "src/app/services/media.files/media.file.service";
import { RepoUsersService } from "src/app/services/repo.users.service/repo.users.service";
import { ImgData, User } from "src/app/types/user";
import { LoginComponent } from "../login/login.component";
import { RegisterComponent } from "./register.component";
describe("Given the  RegisterComponent", () => {
  let component: RegisterComponent;
  let repoUsersService: RepoUsersService;
  let mediaFileService: MediaFileService;
  let fixture: ComponentFixture<RegisterComponent>;
  beforeEach(() => {
    mediaFileService = new MediaFileService();
    TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: "users/login", component: LoginComponent },
        ]),
      ],
      providers: [MediaFileService],
    });
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    repoUsersService = TestBed.inject(RepoUsersService);
    mediaFileService = TestBed.inject(MediaFileService);
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("When we make changes in imageData input", () => {
    it("The method ulploadFile shoul be called", () => {
      const spyOnUploadFile = spyOn(
        mediaFileService,
        "ulploadFile"
      ).and.returnValue(of({} as ImgData));
      component.changeAvatar({} as Event);
      expect(spyOnUploadFile).toHaveBeenCalled();
    });
  });

  describe("When we do submit", () => {
    it("Then repoUsers.create should be called", () => {
      component.newUserForm.setValue({
        userName: "testUserName",
        password: "testWord",
        email: "test@test.com",
        firstName: "TestName",
        lastName: "TestLast",
        avatar: "",
      });
      component.avatar = { url: "test-Url" } as ImgData;
      const spyCreate = spyOn(repoUsersService, "create").and.returnValue(
        of({} as User)
      );

      component.handleSubmit();
      expect(spyCreate).toHaveBeenCalled();
    });
  });
});
