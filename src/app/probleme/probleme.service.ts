import { Injectable } from '@angular/core';
import { IProbleme } from './probleme';

import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

@Injectable()
export class ProblemeService {
  private baseUrl = 'https://interventionsfs.azurewebsites.net/api/Intervention';

constructor(private _http: HttpClient) { }

saveProbleme(probleme: IProbleme): Observable<IProbleme> {
      return this.createProbleme(probleme);
  }
  
  private createProbleme(probleme: IProbleme): Observable<IProbleme> {

    probleme.Id = undefined;
    return this._http.post(this.baseUrl, probleme)
        .do(data => console.log('createProbleme: ' + JSON.stringify(data)))
        .catch(this.handleError);
  }
 
  private handleError(err: HttpErrorResponse) {
    console.error(err.error);
    return Observable.throw(err.message);
  }
}
