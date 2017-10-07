var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { ENV } from '../app/env';
import 'rxjs/add/operator/map';
import { Http, Headers, RequestOptions } from '@angular/http';
/*
  Generated class for the About provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
var About = About_1 = (function () {
    function About(http) {
        this.http = http;
        console.log('Hello About Provider');
    }
    About.prototype.Abouts = function () {
        var body = JSON.stringify(About_1);
        var options = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json',
            })
        });
        // alert(JSON.stringify(ENV.endPoint))
        return this.http.get(ENV.endPoint + 'about_us')
            .map(function (response) {
            return response.json();
        })
            .catch(function (error) {
            return error;
        });
    };
    return About;
}());
About = About_1 = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http])
], About);
export { About };
var About_1;
//# sourceMappingURL=about.js.map