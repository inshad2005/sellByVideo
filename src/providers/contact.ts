import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';
import {ENV} from '../app/env';
import { Http ,Headers,RequestOptions} from '@angular/http';


/*
  Generated class for the Contact provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/


@Injectable()
export class Contact {

  constructor(public http: Http) {
    console.log('Hello Contact Provider');
  }

  contactsMessage(contact: any): Observable < any > {
    // alert(JSON.stringify(contact))
    let body = JSON.stringify(contact);
    let options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json',

      })
    });
    // alert(JSON.stringify(ENV.endPoint))
    return this.http.post(ENV.endPoint + 'contact_us', body, options)

      .map(response => {
        return response.json();
      })
      .catch(error => {
        return error;
      });
  }

}

