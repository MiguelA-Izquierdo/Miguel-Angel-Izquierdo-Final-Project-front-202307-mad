import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormTravelService } from "src/app/services/form-travel.service/form-travel.service";
import { StarsReviewComponent } from "./stars.review.component";

describe("StarsReviewComponent", () => {
  let component: StarsReviewComponent;
  let fixture: ComponentFixture<StarsReviewComponent>;
  let formTravelService: FormTravelService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StarsReviewComponent],
      imports: [HttpClientTestingModule],
      providers: [FormTravelService],
    });
    fixture = TestBed.createComponent(StarsReviewComponent);
    component = fixture.componentInstance;
    formTravelService = TestBed.inject(FormTravelService);
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("When we click on a star", () => {
    it("The method uploadMultipleImg shoul be called", () => {
      const spysetTars = spyOn(formTravelService, "setStars").and.returnValue(
        undefined
      );

      component.handleStar({ target: { value: 1 } } as unknown as Event);
      expect(spysetTars).toHaveBeenCalled();
    });
  });
});
