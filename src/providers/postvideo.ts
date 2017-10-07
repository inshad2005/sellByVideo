import { Injectable } from '@angular/core';
import { Http ,Headers,RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {ENV} from '../app/env';
import 'rxjs/add/operator/map';

/*
  Generated class for the Postvideo provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/


@Injectable()
export class Postvideo {

  constructor(public http: Http) {
    console.log('Hello Postvideo Provider');
  }
  Postvideo(postvideo: any): Observable < any > {
    let body = JSON.stringify(postvideo);
    let options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json',

      })
    });
    // alert(JSON.stringify(ENV.endPoint))
    return this.http.post(ENV.endPoint + 'post_video', body, options)

      .map(response => {
        return response.json();
      })
      .catch(error => {
        return error;
      });
  }
}

