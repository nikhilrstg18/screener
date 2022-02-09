import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { NSEResponse } from '../models/nse-response.interface';

@Injectable({
  providedIn: 'root',
})
export class NseService {
  constructor(private _httpClient: HttpClient) {}

  getData(source: string, index: string): Observable<NSEResponse> {
    return this._httpClient
      .get<NSEResponse>(
        `http://localhost:3000/api/${encodeURIComponent(source)}`,
        {
          params: new HttpParams().set('i', index),
        }
      )
      .pipe(
        catchError((err, caught) => {
          console.log(err, caught);
          return throwError(err);
        })
      );
  }
}
