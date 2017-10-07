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
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Postad } from '../postad/postad';
import { Observable } from 'rxjs/Rx';
import { Categoryprovider } from '../../providers/categoryprovider';
/**
 * Generated class for the Category page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var Category = (function () {
    function Category(navCtrl, navParams, loadingCtrl, alrtCtrl, cat) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.alrtCtrl = alrtCtrl;
        this.cat = cat;
    }
    Category.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log('ionViewDidLoad Category');
        var loading = this.loadingCtrl.create({ content: 'Loading' });
        Observable.fromPromise(loading.present())
            .flatMap(function (data) { return _this.cat.category(_this.cat); })
            .subscribe(function (data) {
            return loading.dismiss().then(function () {
                _this.category = data.data;
                _this.categorydata = _this.category;
            });
        }, function (error) {
            return loading.dismiss().then(function () { });
        });
    };
    Category.prototype.onPostad = function () {
        this.navCtrl.push(Postad);
    };
    Category.prototype.search = function () {
        console.log(this.myInput);
        if (this.myInput == '') {
            this.category = this.categorydata;
            return;
        }
        var ev = this.myInput;
        if (ev && ev.trim() != '') {
            this.category = this.categorydata.filter(function (value) {
                return (value.category.toUpperCase().indexOf(ev.toUpperCase()) > -1);
            });
        }
        else {
            this.category = this.categorydata;
        }
        console.log(this.category);
    };
    return Category;
}());
Category = __decorate([
    IonicPage(),
    Component({
        selector: 'page-category',
        templateUrl: 'category.html',
        providers: [Categoryprovider],
    }),
    __metadata("design:paramtypes", [NavController, NavParams, LoadingController,
        AlertController, Categoryprovider])
], Category);
export { Category };
//# sourceMappingURL=category.js.map