import { HttpClientModule } from "@angular/common/http";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { AppComponent } from "./app.component";
import { CoreModule } from "./core/core.module";
import { FooterComponent } from "./core/footer/footer.component";
import { HeaderComponent } from "./core/header/header.component";
import { StoreService } from "./services/store/store.service";

describe("AppComponent", () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, CoreModule],
      declarations: [AppComponent, HeaderComponent, FooterComponent],
      providers: [StoreService],
    });
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create the app", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  describe("When render the component and localStorage contains a token", () => {
    it("The getUserInfo should be called", () => {
      localStorage.setItem("Token", JSON.stringify({ test: "test" }));
      const spyOnInit = spyOn(component, "getUserInfo");
      component.ngOnInit();
      expect(spyOnInit).toHaveBeenCalled();
    });
  });

  describe("When render the component and localStorage it does not have a token", () => {
    it("The getUserInfo should be called", () => {
      const spyOnInit = spyOn(component, "getUserInfo");
      localStorage.clear();
      component.ngOnInit();
      expect(spyOnInit).toHaveBeenCalled();
    });
  });
});
