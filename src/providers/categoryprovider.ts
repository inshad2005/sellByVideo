import { Injectable } from '@angular/core';
import { Http ,Headers,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';
import {ENV} from '../app/env';

/*
  Generated class for the Categoryprovider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/


@Injectable()
export class Categoryprovider {

	constructor(public http: Http) {
		console.log('Hello Categoryprovider Provider');
	}
	category(category: any): Observable < any > {
		/// this.logProvider.info('provider', 'lead', 'updateLead');


		let body = JSON.stringify(category);
		let options = new RequestOptions({
			headers: new Headers({
				'Content-Type': 'application/json',

			})
		});
		// alert(JSON.stringify(ENV.endPoint))
		return this.http.post(ENV.endPoint + 'category_details', body, options)

			.map(response => {
				return response.json();
			})
			.catch(error => {
				return error;
			});
	}
}


