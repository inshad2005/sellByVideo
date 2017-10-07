var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, ViewController } from 'ionic-angular';
// import { MediaCapture, MediaFile, CaptureError, CaptureVideoOptions } from '@ionic-native/media-capture';
// import { Camera, CameraOptions } from '@ionic-native/camera';
import { Postadvideo } from '../postadvideo/postadvideo';
/**
 * Generated class for the Popup page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var Popup = (function () {
    function Popup(navCtrl, navParams, pop, view) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.pop = pop;
        this.view = view;
    }
    Popup.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad Popup');
    };
    Popup.prototype.onTakeVideo = function () {
        var _this = this;
        this.view.dismiss({ information: 'buttonClick' }).then(function () { _this.navCtrl.push(Postadvideo, { info: 'onTake' }); });
    };
    Popup.prototype.selectvideo = function () {
        var _this = this;
        this.view.dismiss({ information: 'buttonClick' }).then(function () { _this.navCtrl.push(Postadvideo, { info: 'select' }); });
    };
    return Popup;
}());
__decorate([
    ViewChild('myvideo'),
    __metadata("design:type", Object)
], Popup.prototype, "myVideo", void 0);
Popup = __decorate([
    IonicPage(),
    Component({
        selector: 'page-popup',
        templateUrl: 'popup.html',
    }),
    __metadata("design:paramtypes", [NavController, NavParams, PopoverController, ViewController])
], Popup);
export { Popup };
//# sourceMappingURL=popup.js.map