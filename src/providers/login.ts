import { Injectable } from '@angular/core';
import { Http ,Headers,RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {ENV} from '../app/env';
import 'rxjs/add/operator/map';

/*
  Generated class for the Login provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/


@Injectable()
export class LoginProvider {

  constructor(public http: Http) {
    console.log('Hello Login Provider');
  }
  Login(login: any): Observable < any > {
    let body = JSON.stringify(login);
    let options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json',

      })
    });
    // alert(JSON.stringify(ENV.endPoint))
    return this.http.post(ENV.endPoint + 'login', body, options)

      .map(response => {
        return response.json();
      })
      .catch(error => {
        // alert(error);
        return error;
      });
  }
  loginWithFb(loginfb: any): Observable < any > {
    let body = JSON.stringify(loginfb);
    let options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json',

      })
    });
    // alert(JSON.stringify(ENV.endPoint))
    return this.http.post(ENV.endPoint + 'sign_up', body, options)

      .map(response => {
        return response.json();
      })
      .catch(error => {
        // alert(JSON.stringify(error))
        return error;
      });

  }
  loginWithGoogle(logingoogle: any): Observable < any > {
    // alert(JSON.stringify (logingoogle));
    let body = JSON.stringify(logingoogle);
    let options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json',

      })
    });
    // alert(JSON.stringify(ENV.endPoint))
    return this.http.post(ENV.endPoint + 'sign_up', body, options)

      .map(response => {
        return response.json();
      })
      .catch(error => {
        //alert(JSON.stringify(error))
        return error;
      });

  }
}

