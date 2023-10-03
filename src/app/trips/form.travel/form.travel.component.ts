import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { FormTravelService } from "src/app/services/form-travel.service/form-travel.service";
import { MediaFileService } from "src/app/services/media.files/media.file.service";
import { RepoTripsService } from "src/app/services/repo.trips.service/repo.trips.service.service";
import { Activity, Assessment, DayTravel, Travel } from "src/app/types/travel";
import { ImgData } from "src/app/types/user";
import {
  activitiesFormEmpty,
  defaultMainPhoto,
  firstStepFormEmpty,
} from "src/app/utils/config";

@Component({
  selector: "trips-form-travel",
  templateUrl: "./form.travel.component.html",
  styleUrls: ["./form.travel.component.scss"],
})
export class FormTravelComponent implements OnInit {
  newTravel: Travel = { days: [{}, {}] } as Travel;
  firstStepForm: FormGroup = this.formBuilder.group(firstStepFormEmpty);
  mainPhoto: ImgData = defaultMainPhoto;
  activitiesPhotos: ImgData[] = [];
  activitiesForm: FormGroup = this.formBuilder.group(activitiesFormEmpty);
  currentStep = 1;
  currentDay = 0;
  starsState: Assessment[] = [];
  travelIdParams: string;
  stateUploadPhoto: "loading" | "loaded" = "loaded";
  stateSubmit: "sending" | "sent" = "sent";
  constructor(
    public formBuilder: FormBuilder,
    private repoTrips: RepoTripsService,
    private formsService: FormTravelService,
    private mediaFilesService: MediaFileService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.travelIdParams = this.route.snapshot.paramMap.get("id")!;
    this.formsService.getStars().subscribe((data) => (this.starsState = data));
    this.formsService.getTravel().subscribe((data) => (this.newTravel = data));
  }

  ngOnInit(): void {
    if (this.travelIdParams) {
      this.initializeForm();
    }
  }

  initializeForm() {
    this.repoTrips.getById(this.travelIdParams).subscribe((data) => {
      this.newTravel = data;
      this.firstStepForm = this.formBuilder.group(
        this.formsService.initializeForm(data)
      );
      this.mainPhoto = data.mainPhoto;
    });
  }

  handleNextPage() {
    this.currentDay++;
  }

  handlePreviousPage() {
    this.currentDay--;
  }
  handleSubmitFirstStep() {
    if (this.firstStepForm.valid && !this.travelIdParams) {
      this.newTravel = this.firstStepForm.value;
      this.newTravel.mainPhoto = this.mainPhoto;
      const totalDays = this.newTravel.totalDays;
      this.newTravel.days = [];
      for (let i = 0; i < totalDays; i++) {
        this.newTravel.days.push({
          dayNumber: i,
          activities: [],
        } as DayTravel);
      }
      this.currentStep = 2;
    } else if (this.firstStepForm.valid) {
      const totalDays = this.newTravel.totalDays;
      const days = this.newTravel.days;
      this.newTravel = this.firstStepForm.value;
      this.newTravel.days = days;
      this.newTravel.mainPhoto = this.mainPhoto;
      this.newTravel.totalDays = totalDays;

      this.currentStep = 2;
    }
  }

  changeMainPhoto(event: Event) {
    this.mediaFilesService
      .ulploadFile(event, this.repoTrips)
      ?.subscribe((data) => {
        this.mainPhoto = data;
        this.firstStepForm.value.mainPhoto = this.mainPhoto;
      });
  }

  changeInputPhotos(event: Event) {
    this.stateUploadPhoto = "loading";
    this.mediaFilesService
      .ulploadFiles(event, this.repoTrips)
      .subscribe((data) => {
        this.activitiesPhotos = data;
        this.stateUploadPhoto = "loaded";
      });
  }

  handleSubmitActivity() {
    const finalActivity: Activity = this.activitiesForm.value;
    finalActivity.photos = this.activitiesPhotos;
    finalActivity.assessment = this.starsState;
    this.newTravel.days[this.currentDay].activities.push(finalActivity);
    this.formsService.resetStars();
    this.activitiesForm.reset();
  }

  handleCreateTravel() {
    if (this.travelIdParams) {
      this.stateSubmit = "sending";
      this.formsService
        .updateTravel(this.newTravel, this.travelIdParams)
        .subscribe(() => this.router.navigateByUrl("/home"));
    } else {
      this.stateSubmit = "sending";
      this.formsService.createTravel(this.newTravel).subscribe(() => {
        this.formsService.resetStars();
        this.router.navigateByUrl("/home");
      });
    }
  }
}
