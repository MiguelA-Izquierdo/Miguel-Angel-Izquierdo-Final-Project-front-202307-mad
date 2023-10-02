import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { Travel } from "../../types/travel";
import { ImgData } from "../../types/user";
import { Repository } from "../repo.structure";
import { StoreService } from "../store/store.service";
@Injectable({
  providedIn: "root",
})
export class RepoTripsService implements Repository<Travel> {
  urlBase: string;
  token = "";

  constructor(private http: HttpClient, private storeService: StoreService) {
    this.urlBase = "http://localhost:3300/trips";
    this.storeService
      .getCurrentUser()
      .subscribe((data) => (this.token = data.token));
  }

  getAll() {
    return this.http.get(this.urlBase) as Observable<Travel[]>;
  }

  getAllFiltered({
    key,
    value,
  }: {
    key: string;
    value: string;
  }): Observable<Travel[]> {
    const url = this.urlBase + "/filter";
    return this.http.post(
      url,
      { key, value },
      {
        headers: {
          ["Authorization"]: `Bearer ${this.token}`,
        },
      }
    ) as Observable<Travel[]>;
  }

  getById(id: string): Observable<Travel> {
    return this.http.get(this.urlBase + "/" + id) as Observable<Travel>;
  }
  uploadImg(data: FormData): Observable<ImgData> {
    const url = this.urlBase + "/uploadphoto";
    return this.http
      .post(url, data, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
      .pipe(
        map((response) => {
          return response as ImgData;
        })
      )
      .pipe((catchError) => {
        return catchError;
      });
  }
  uploadMultipleImg(data: FormData): Observable<ImgData[]> {
    const url = this.urlBase + "/uploadphotos";
    return this.http
      .post(url, data, {
        headers: {
          ["Authorization"]: `Bearer ${this.token}`,
        },
      })
      .pipe(
        map((response) => {
          return response as ImgData[];
        })
      )
      .pipe((catchError) => {
        return catchError;
      });
  }
  create(data: Travel): Observable<Travel> {
    const url = this.urlBase;
    return this.http
      .post(url, data, {
        headers: {
          ["Authorization"]: `Bearer ${this.token}`,
        },
      })
      .pipe(
        map((response) => {
          return response as Travel;
        })
      )
      .pipe((catchError) => {
        return catchError;
      });
  }

  update(id: string, newData: Partial<Travel>): Observable<Travel> {
    const url = this.urlBase + "/" + id;
    return this.http.patch(url, newData, {
      headers: {
        ["Authorization"]: `Bearer ${this.token}`,
      },
    }) as Observable<Travel>;
  }

  delete(id: string): Observable<void> {
    const url = this.urlBase + "/" + id;
    const data = this.http
      .delete(url, {
        headers: {
          ["Authorization"]: `Bearer ${this.token}`,
        },
      })
      .pipe(map(() => undefined))
      .pipe((catchError) => {
        return catchError;
      });
    return data;
  }
}
