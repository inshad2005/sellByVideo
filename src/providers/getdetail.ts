import { Injectable } from '@angular/core';
import {ENV} from '../app/env';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';
import { Http ,Headers,RequestOptions} from '@angular/http';

/*
  Generated class for the Getdetail provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/


@Injectable()
export class Getdetail {

  constructor(public http: Http) {

    console.log('Hello Getdetail Provider');
  }

  Getdetail(getdetail: any): Observable < any > {
    let body = JSON.stringify(getdetail);
    let options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json',

      })
    });
    return this.http.post(ENV.endPoint + 'get_ad', body, options)

      .map(response => {
        return response.json();
      })
      .catch(error => {
        return error;
      });
  }


  Updatedetail(updatedetail: any): Observable < any > {
    let body = JSON.stringify(updatedetail);
    let options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json',

      })
    });
    return this.http.post(ENV.endPoint + 'edit_ad', body, options)

      .map(response => {
        return response.json();
      })
      .catch(error => {
        return error;
      });
  }

}


