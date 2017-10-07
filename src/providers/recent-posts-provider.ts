import { Injectable } from '@angular/core';
import { Http,Headers,RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { ENV }from '../app/env';

import 'rxjs/add/operator/map';

/*
  Generated class for the RecentPostsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/


@Injectable()
export class RecentPostsProvider {

  constructor(public http: Http) {
    console.log('Hello RecentPostsProvider Provider');
  }
  recentPost(recent: any): Observable < any > {
    let body = JSON.stringify(recent);
    let options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json',

      })
    });
    // alert(JSON.stringify(ENV.endPoint))
    return this.http.post(ENV.endPoint + 'recent_ads', body, options)

      .map(response => {
        return response.json();
      })
      .catch(error => {
        return error;
      });
  }
}


