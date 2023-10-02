import { Observable } from "rxjs";
export interface Repository<T> {
  getAll(): Observable<T[]>;
  getById(id: string): Observable<T>;
  create(data: T): Observable<T>;
  update(id: string, newData: Partial<T>): Observable<T>;
  delete(id: string): Observable<void>;
}
