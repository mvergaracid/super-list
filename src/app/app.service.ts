import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import all_supers from './_files/all-supers.json'

@Injectable()
export class AppService {
  constructor(public http: HttpClient) {
  }

  searchById(id: number): Observable<any> {
    return this.http.get(`${environment.url_api_heroes}${environment.token}/${id}`)
      .pipe(
        catchError(err => this.handleError(err))
      )
  }

  getAllSupers() {
    const values: any = all_supers.map(item => {
      const value:any = {}
      value.id = item.id,
      value.name = item.name
      value.alignment = item.biography.alignment
      value.gender = item.appearance.gender
      return value
    })
    return values
  }

  handleError(error: any): Observable<any> {
    console.log('An error occurred', error);
    return throwError(error);
  }
}