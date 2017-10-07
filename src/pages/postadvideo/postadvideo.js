var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild, } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { MediaCapture } from '@ionic-native/media-capture';
import { Camera } from '@ionic-native/camera';
import { Addetails } from '../addetails/addetails';
import { Postad } from '../postad/postad';
var Postadvideo = (function () {
    function Postadvideo(navCtrl, navParams, mediaCapture, camera, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.mediaCapture = mediaCapture;
        this.camera = camera;
        this.loadingCtrl = loadingCtrl;
        // this.getVideo=this.navParams.get('passVideo');
        this.take = this.navParams.get('info');
    }
    Postadvideo.prototype.ngOnInit = function () {
        if (this.take == 'onTake') {
            this.onTakeVideo();
        }
        else if (this.take == 'select') {
            // code...
            this.selectvideo();
        }
    };
    Postadvideo.prototype.onTakeVideo = function () {
        var _this = this;
        var video = this.myVideo.nativeElement;
        var options = { limit: 1, duration: 30 };
        this.mediaCapture.captureVideo(options).then(function (data) {
            video.src = data[0].fullPath;
            _this.imageUrl = data[0].fullPath;
            video.play();
        });
    };
    Postadvideo.prototype.selectvideo = function () {
        var _this = this;
        var video = this.myVideo.nativeElement;
        var options = {
            quality: 100,
            sourceType: 2,
            mediaType: 1
        };
        this.camera.getPicture(options).then(function (imageData) {
            video.src = imageData;
            _this.imageUrl = imageData;
            video.play();
        });
    };
    Postadvideo.prototype.onNext = function () {
        this.navCtrl.push(Addetails, { image: this.imageUrl });
    };
    Postadvideo.prototype.onCancel = function () {
        this.navCtrl.popTo(Postad);
    };
    return Postadvideo;
}());
__decorate([
    ViewChild('myvideo'),
    __metadata("design:type", Object)
], Postadvideo.prototype, "myVideo", void 0);
Postadvideo = __decorate([
    IonicPage(),
    Component({
        selector: 'page-postadvideo',
        templateUrl: 'postadvideo.html',
    }),
    __metadata("design:paramtypes", [NavController, NavParams, MediaCapture,
        Camera, LoadingController])
], Postadvideo);
export { Postadvideo };
//# sourceMappingURL=postadvideo.js.map