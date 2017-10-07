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
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';
import { Popup } from '../popup/popup';
/**
 * Generated class for the Postad page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var Postad = (function () {
    function Postad(navCtrl, navParams, popoverCtrl, view) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.popoverCtrl = popoverCtrl;
        this.view = view;
        this.img = "image_open";
    }
    Postad.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad Postad');
    };
    Postad.prototype.onImageClick = function () {
        var _this = this;
        this.img = "image_close";
        var popover = this.popoverCtrl.create(Popup);
        popover.present({});
        popover.onDidDismiss(function (data) {
            if (data.information == 'buttonClick') {
                _this.img = "image_open";
            }
        });
    };
    return Postad;
}());
Postad = __decorate([
    IonicPage(),
    Component({
        selector: 'page-postad',
        templateUrl: 'postad.html',
    }),
    __metadata("design:paramtypes", [NavController, NavParams, PopoverController, ViewController])
], Postad);
export { Postad };
//# sourceMappingURL=postad.js.map