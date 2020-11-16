import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { _throw as throwError } from 'rxjs/observable/throw';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';


@Injectable()

export class GraphchartService {

  errorData: {};
  private apiUrl = `${environment.apiUrl}`;
  constructor(private http: HttpClient) { }

  getCountries(){
    return this.http.get(`${this.apiUrl}/countries`)
    .pipe(
      catchError(this.handleError)
    )
  }

  filterCountry(counrty: any){
    return this.http.get(`${this.apiUrl}/total/dayone/country/${counrty}`)
    .pipe(
      catchError(this.handleError)
    )
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    this.errorData = {
      errorTitle: 'Oops! Request for document failed',
      errorDesc: 'Something bad happened. Please try again later.'
    };
    return throwError(this.errorData);
  }

}
