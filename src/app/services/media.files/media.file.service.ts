import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ImgData } from "src/app/types/user";
import { RepoTripsService } from "../repo.trips.service/repo.trips.service.service";
import { RepoUsersService } from "../repo.users.service/repo.users.service";
@Injectable({
  providedIn: "root",
})
export class MediaFileService {
  ulploadFile(event: Event, repo: RepoTripsService | RepoUsersService) {
    const mainPhotoImg: FormData = new FormData();
    const target = event.target as HTMLInputElement;
    const fileMainPhoto = target.files?.[0];
    console.dir(typeof fileMainPhoto);
    if (!fileMainPhoto) return;
    mainPhotoImg.append("mainPhoto", fileMainPhoto);
    return repo.uploadImg(mainPhotoImg) as Observable<ImgData>;
  }

  ulploadFiles(event: Event, repo: RepoTripsService) {
    const multiplePhotosImg: FormData = new FormData();
    const target = event.target as HTMLInputElement;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    Array.from(target.files!).forEach((file) => {
      multiplePhotosImg.append("photos", file);
    });

    return repo.uploadMultipleImg(multiplePhotosImg) as Observable<ImgData[]>;
  }
}
