import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ITypeDeProbleme } from './typeDeProbleme';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

@Injectable()
export class TypeDeProblemeService {
  private baseUrl = 'api/typeProbleme';
  
  constructor(private _http: HttpClient) {   }

  obtenirProblemes(): Observable<ITypeDeProbleme[]> {
    return this._http.get<ITypeDeProbleme[]>(this.baseUrl)
        .do(data => console.log('obtenirProblemes: ' + JSON.stringify(data)))
        .catch(this.handleError);
  }

  private handleError(err: HttpErrorResponse) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    console.error(err.error);
    return Observable.throw(err.message);
  }

}
