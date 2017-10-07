var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';
import { About } from '../../providers/about';
/**
 * Generated class for the Aboutus page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var Aboutus = (function () {
    function Aboutus(navCtrl, navParams, loadingCtrl, aboutProvider, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.aboutProvider = aboutProvider;
        this.alertCtrl = alertCtrl;
    }
    Aboutus.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad Aboutus');
    };
    Aboutus.prototype.ngOnInit = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({ content: 'Loading' });
        Observable.fromPromise(loading.present())
            .flatMap(function (data) { return _this.aboutProvider.Abouts(); })
            .subscribe(function (data) {
            return loading.dismiss().then(function () {
                _this.about = data;
                _this.about_data = data.about_us.content;
                //alert(JSON.stringify(this.about));
            });
        }, function (error) {
            return loading.dismiss().then(function () { });
        });
    };
    return Aboutus;
}());
Aboutus = __decorate([
    IonicPage(),
    Component({
        selector: 'page-aboutus',
        templateUrl: 'aboutus.html',
        providers: [About],
    }),
    __metadata("design:paramtypes", [NavController, NavParams, LoadingController,
        About,
        AlertController])
], Aboutus);
export { Aboutus };
//# sourceMappingURL=aboutus.js.map