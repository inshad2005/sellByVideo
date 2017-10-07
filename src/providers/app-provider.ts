import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Current} from "../model/Current";
import 'rxjs/add/operator/map';

/*
  Generated class for the AppProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AppProvider {
 current:Current
  constructor(public http: Http) {
 	this.current = new Current('all');
    console.log('Hello AppProvider Provider');
  }

}
