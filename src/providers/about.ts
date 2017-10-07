import { Injectable } from '@angular/core';
import {ENV} from '../app/env';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';
import { Http ,Headers,RequestOptions} from '@angular/http';

/*
  Generated class for the About provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/


@Injectable()
export class About {

	constructor(public http: Http) {
		console.log('Hello About Provider');
	}
	Abouts(): Observable < any > {

		let body = JSON.stringify(About);
		let options = new RequestOptions({
			headers: new Headers({
				'Content-Type': 'application/json',

			})
		});
		// alert(JSON.stringify(ENV.endPoint))
		return this.http.get(ENV.endPoint + 'about_us')

			.map(response => {
				return response.json();
			})
			.catch(error => {
				return error;
			});
	}

}


