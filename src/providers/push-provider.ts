import { Injectable } from '@angular/core';
import { Http ,Headers,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';
import {ENV} from '../app/env';

/*
  Generated class for the PushProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/


@Injectable()
export class PushProvider {

  constructor(public http: Http) {
    console.log('Hello PushProvider Provider');
  }
  sendmessage(text: any): Observable < any > {
    let body = JSON.stringify(text);
    let options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json',

      })
    });
    // alert(JSON.stringify(ENV.endPoint))
    return this.http.post(ENV.endPoint + 'customnotification', body, options)

      .map(response => {
        return response.json();
      })
      .catch(error => {
        return error;
      });
  }

  recievemessage(text: any): Observable < any > {
    let body = JSON.stringify(text);
    let options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json',

      })
    });
    // alert(JSON.stringify(ENV.endPoint))
    return this.http.get(ENV.endPoint + 'messagereceive/' + localStorage['user_id'])

      .map(response => {
        return response.json();
      })
      .catch(error => {
        return error;
      });
  }

  messageStatus(): Observable < any > {
    // let body = JSON.stringify();
    let options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json',

      })
    });
    // alert(JSON.stringify(ENV.endPoint))
    return this.http.get(ENV.endPoint + 'unreadCount/' + localStorage['user_id'],options)

      .map(response => {
        return response.json();
      })
      .catch(error => {
        return error;
      });
  }
  deleteMessage(messagedata): Observable<any> {
   //alert(JSON.stringify(bookdata))
   let body = JSON.stringify(messagedata);
    let options = new RequestOptions({
    headers: new Headers({
    'Content-Type': 'application/json',
    })
  });
  return this.http.post(ENV.endPoint+'deleteMessage', body,options)
  .map(response => {
  return response.json();
  })
  .catch(error =>{
   console.log(JSON.stringify(error))
  return error;
  });
  }
}


