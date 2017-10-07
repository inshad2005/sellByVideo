import { Injectable } from '@angular/core';
import { Http,Headers,RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {ENV} from '../app/env';
import 'rxjs/add/operator/map';

/*
  Generated class for the Postdetailprovider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/


@Injectable()
export class Postdetailprovider {

  constructor(public http: Http) {
    console.log('Hello Postdetailprovider Provider');
  }
  postdetails(postdetail: any): Observable < any > {
    let body = JSON.stringify(postdetail);
    let options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json',

      })
    });
    return this.http.post(ENV.endPoint + 'post_ad', body, options)

      .map(response => {
        return response.json();
      })
      .catch(error => {
        // alert(error)
        return error;
      });

  }
}


