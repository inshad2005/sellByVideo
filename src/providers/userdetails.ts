import { Injectable } from '@angular/core';
import { Http ,Headers,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';
import {ENV} from '../app/env';

/*
  Generated class for the Userdetails provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/


@Injectable()
export class Userdetails {

	constructor(public http: Http) {
		console.log('Hello Userdetails Provider');
	}
	Details(details: any): Observable < any > {
		/// this.logProvider.info('provider', 'lead', 'updateLead');


		let body = JSON.stringify(details);
		let options = new RequestOptions({
			headers: new Headers({
				'Content-Type': 'application/json',

			})
		});
		// alert(JSON.stringify(ENV.endPoint))
		return this.http.post(ENV.endPoint + 'profile', body, options)

			.map(response => {
				return response.json();
			})
			.catch(error => {
				return error;
			});
	}
}


