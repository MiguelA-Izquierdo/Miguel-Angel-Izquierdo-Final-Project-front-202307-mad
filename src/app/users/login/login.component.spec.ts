import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import { of, throwError } from "rxjs";
import { HomeComponent } from "src/app/home/home.component";
import { RepoUsersService } from "src/app/services/repo.users.service/repo.users.service";
import { UserWithToken } from "src/app/types/user";
import { LoginComponent } from "./login.component";

describe("LoginComponent", () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let repoUser: RepoUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        HttpClientModule,
        CommonModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([
          { path: "home", component: HomeComponent },
        ]),
      ],
      providers: [RepoUsersService],
    });

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    repoUser = TestBed.inject(RepoUsersService);
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("When we call method handleSubmit with the correct user", () => {
    it("Then the method handleSubmit should to be called", () => {
      component.newLoginForm.setValue({
        userName: "testUserName",
        password: "testPassword",
      });

      const spyLogin = spyOn(repoUser, "login").and.returnValue(
        of({} as UserWithToken)
      );
      component.handleSubmit();
      expect(spyLogin).toHaveBeenCalled();
    });
  });

  describe("When we call method handleSubmit with the error user", () => {
    it("Then the method handleSubmit should to be called", () => {
      component.newLoginForm.setValue({
        userName: "testUserName",
        password: "testPassword",
      });
      const error = new Error();
      const spyLogin = spyOn(repoUser, "login").and.returnValue(
        throwError(() => error)
      );

      component.handleSubmit();
      expect(component.loginState).toBe("error");
      expect(spyLogin).toHaveBeenCalled();
    });
  });

  describe("When we click button back", () => {
    it("Then the loginState should be logout", () => {
      component.handleBack();
      expect(component.loginState).toBe("logout");
    });
  });
});
