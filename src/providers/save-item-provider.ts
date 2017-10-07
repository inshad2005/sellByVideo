import { Injectable } from '@angular/core';
import { Http ,Headers,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';
import {ENV} from '../app/env';

/*
  Generated class for the SaveItemProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class SaveItemProvider {

  constructor(public http: Http) {
    console.log('Hello SaveItemProvider Provider');
  }
saveitem(save:any): Observable<any> {
/// this.logProvider.info('provider', 'lead', 'updateLead');


let body = JSON.stringify(save);
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
saveitemstatus(status:any): Observable<any> {
/// this.logProvider.info('provider', 'lead', 'updateLead');


let body = JSON.stringify(status);
let options = new RequestOptions({
headers: new Headers({
'Content-Type': 'application/json',

})
});
// alert(JSON.stringify(ENV.endPoint))
return this.http.post(ENV.endPoint+'getStatus', body,options)

.map(response => {
return response.json();
})
.catch(error =>{
return error;
});
}
}
