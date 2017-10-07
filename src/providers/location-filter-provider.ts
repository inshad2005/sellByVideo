import { Injectable } from '@angular/core';
import {ENV} from '../app/env';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';
import { Http ,Headers,RequestOptions} from '@angular/http';

/*
  Generated class for the LocationFilterProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/


@Injectable()
export class LocationFilterProvider {

  constructor(public http: Http) {
    console.log('Hello LocationFilterProvider Provider');
  }
  nearBy(details: any): Observable < any > {
    let body = JSON.stringify(details);
    let options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json',

      })
    });
    return this.http.post(ENV.endPoint + 'search', body, options)

      .map(response => {
        return response.json();
      })
      .catch(error => {
        return error;
      });
  }

}


