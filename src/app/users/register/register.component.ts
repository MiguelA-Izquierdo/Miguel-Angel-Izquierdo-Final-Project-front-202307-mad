import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { MediaFileService } from "src/app/services/media.files/media.file.service";
import { RepoUsersService } from "src/app/services/repo.users.service/repo.users.service";
import { ImgData, User } from "src/app/types/user";
import { avatar } from "src/app/utils/config";

@Component({
  selector: "trips-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent {
  newUserForm: FormGroup;
  avatar: ImgData;

  constructor(
    public formBuilder: FormBuilder,
    private repoUsers: RepoUsersService,
    public router: Router,
    private mediaFilesService: MediaFileService
  ) {
    this.avatar = avatar as ImgData;

    this.newUserForm = formBuilder.group({
      userName: ["", [Validators.required]],
      password: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      avatar: ["", []],
    });
  }

  changeAvatar(event: Event) {
    this.mediaFilesService
      .ulploadFile(event, this.repoUsers)
      ?.subscribe((data) => {
        this.avatar = data;
      });
  }

  handleSubmit() {
    if (this.newUserForm.valid) {
      const finalForm: User = this.newUserForm.value;
      finalForm.avatar = this.avatar;
      this.repoUsers.create(finalForm).subscribe(() => {
        this.router.navigateByUrl("/users/login");
      });
    }
  }
}
