import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, filter, map, Observable, of, throwError } from 'rxjs';
import { NSEResponse } from '../models/nse-response.interface';

@Injectable({
  providedIn: 'root',
})
export class NseService {
  constructor(private _httpClient: HttpClient) {}

  getData(source: string, index: string): Observable<NSEResponse | undefined> {
    return this._httpClient
      .get<NSEResponse>(
        `http://localhost:3000/api/${encodeURIComponent(source)}`,
        {
          params: new HttpParams().set('i', index),
        }
      )
      .pipe(
        catchError((err) => {
          console.error(err);
          return of(undefined);
        }),
        filter((data) => data !== undefined)
      );
  }
}
