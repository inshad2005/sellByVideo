import { Injectable } from '@angular/core';
import { Http ,Headers,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';
import {ENV} from '../app/env';


/*
  Generated class for the SavedAd provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class SavedAd {

  constructor(public http: Http) {
    console.log('Hello SavedAd Provider');
  }
	saveditem(saved:any): Observable<any> {
			let body = JSON.stringify(saved);
			let options = new RequestOptions({
			headers: new Headers({
			'Content-Type': 'application/json',
			})
		});
		return this.http.post(ENV.endPoint+'getuserpost/'+localStorage['user_id'], body,options)

		.map(response => {
			return response.json();
		})
		.catch(error =>{
			return error;
		});
	}

	deleteSaveItem(savedAdds:any): Observable<any> {
			
		let body = JSON.stringify(savedAdds);
		let options = new RequestOptions({
		headers: new Headers({
		'Content-Type': 'application/json',

		})
		});
		// alert(JSON.stringify(ENV.endPoint))
		return this.http.post(ENV.endPoint+'userpost', body,options)

		.map(response => {
		return response.json();
		})
		.catch(error =>{
		return error;
});
	}
	deletePostAdd(adds:any): Observable<any> {
			let body = JSON.stringify(adds);
			let options = new RequestOptions({
			headers: new Headers({
			'Content-Type': 'application/json',
			})
		});
		return this.http.post(ENV.endPoint+'DelPostUser', body,options)

		.map(response => {
			return response.json();
		})
		.catch(error =>{
			return error;
		});
	}
}
