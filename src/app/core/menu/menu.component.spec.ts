import { ComponentFixture, TestBed } from "@angular/core/testing";

import { RouterModule } from "@angular/router";
import { LoginComponent } from "src/app/users/login/login.component";
import { MenuComponent } from "./menu.component";

describe("MenuComponent", () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuComponent],
      imports: [
        RouterModule.forRoot([
          { path: "trips/alltrips", component: LoginComponent },
        ]),
      ],
    });
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("When we call method handleLogin", () => {
    it("Then the method handleSubmit should to be called", () => {
      const spyRouter = spyOn(
        component.router,
        "navigateByUrl"
      ).and.returnValue({} as unknown as Promise<true>);
      component.handleLogin();
      component.handleLogout();
      expect(spyRouter).toHaveBeenCalled();
    });
  });
});
