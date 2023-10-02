import { ComponentFixture, TestBed } from "@angular/core/testing";

import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { AppRoutingModule } from "src/app/app-routing.module";
import { StoreService } from "src/app/services/store/store.service";
import { LoginComponent } from "src/app/users/login/login.component";
import { UsersModule } from "src/app/users/users.module";
import { MenuComponent } from "../menu/menu.component";
import { HeaderComponent } from "./header.component";

describe("HeaderComponent", () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let serviceStore: StoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent, HeaderComponent, MenuComponent],
      imports: [
        UsersModule,
        HttpClientModule,
        AppRoutingModule,
        RouterModule.forRoot([
          { path: "trips/alltrips", component: LoginComponent },
        ]),
      ],
    });
    fixture = TestBed.createComponent(HeaderComponent);
    serviceStore = TestBed.inject(StoreService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("When we call method changeStateMenu whith isOpenMenu=true", () => {
    it("Then the new valure isOpenMenu shoul be false", () => {
      const spySetOpenMenu = spyOn(serviceStore, "setIsOpenMenu");
      component.changeStateMenu();
      expect(spySetOpenMenu).toHaveBeenCalled();
    });
  });

  describe("When we call method handleHome", () => {
    it("Then the navigateByUrl should be called", () => {
      component.isOpenMenu = true;
      const spyRouter = spyOn(
        component.router,
        "navigateByUrl"
      ).and.returnValue({} as unknown as Promise<true>);
      component.handleHome();
      expect(spyRouter).toHaveBeenCalled();
    });
  });
});
