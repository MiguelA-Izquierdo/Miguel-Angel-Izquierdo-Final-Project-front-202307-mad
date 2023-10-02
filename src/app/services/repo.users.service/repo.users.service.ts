import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { ImgData, LoginData, User, UserWithToken } from "../../types/user";
import { Repository } from "../repo.structure";
import { StoreService } from "../store/store.service";

@Injectable({
  providedIn: "root",
})
export class RepoUsersService implements Repository<User> {
  urlBase: string;

  constructor(private http: HttpClient, private storeService: StoreService) {
    this.urlBase = "http://localhost:3300/users";
  }

  login(dataLogin: LoginData): Observable<UserWithToken> {
    const url = this.urlBase + "/login";

    return this.http
      .patch(url, dataLogin)
      .pipe(
        map((response) => {
          localStorage.setItem("Token", JSON.stringify(response));
          return response as UserWithToken;
        })
      )
      .pipe((catchError) => {
        return catchError;
      });
  }

  getAll(): Observable<User[]> {
    return this.http.get(this.urlBase) as Observable<User[]>;
  }

  getById(id: string): Observable<User> {
    return this.http.get(this.urlBase + "/" + id) as Observable<User>;
  }

  uploadImg(data: FormData): Observable<ImgData> {
    const url = this.urlBase + "/uploadphoto";

    return this.http
      .post(url, data)
      .pipe(
        map((response) => {
          return response as ImgData;
        })
      )
      .pipe((catchError) => {
        return catchError;
      });
  }
  create(data: User): Observable<User> {
    const url = this.urlBase + "/register";

    return this.http
      .post(url, data)
      .pipe(
        map((response) => {
          return response as User;
        })
      )
      .pipe((catchError) => {
        return catchError;
      });
  }

  update(id: string, newData: Partial<User>): Observable<User> {
    const url = this.urlBase + "/" + id;
    return this.http.patch(url, newData) as Observable<User>;
  }

  delete(id: string): Observable<void> {
    const url = this.urlBase + "/" + id;
    return this.http
      .delete(url)
      .pipe(map(() => undefined))
      .pipe((catchError) => {
        return catchError;
      });
  }
}
