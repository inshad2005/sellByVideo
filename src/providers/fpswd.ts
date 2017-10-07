import { Injectable } from '@angular/core';
import { Http ,Headers,RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {ENV} from '../app/env';
import 'rxjs/add/operator/map';

/*
  Generated class for the Fpswd provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/


@Injectable()
export class Fpswd {

  constructor(public http: Http) {
    console.log('Hello Fpswd Provider');
  }
  func1(func1: any): Observable < any > {

    let body = {
      email: func1

    }
    let options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json',

      })
    });
    // alert(JSON.stringify(ENV.endPoint))
    return this.http.post(ENV.endPoint + 'forgot_password', body, options)

      .map(response => {
        return response.json();
      })
      .catch(error => {
        return error;
      });
  }
  func2(login: any): Observable < any > {
    let body = JSON.stringify(login);

    let options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json',

      })
    });
    // alert(JSON.stringify(ENV.endPoint))
    return this.http.post(ENV.endPoint + 'reset_pass', body, options)

      .map(response => {
        return response.json();
      })
      .catch(error => {
        // alert(JSON.stringify(error))
        return error;
      });

  }
}

