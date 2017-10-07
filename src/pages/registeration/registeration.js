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
import { Transfer } from '@ionic-native/transfer';
import { Register } from '../../providers/register';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { Camera } from '@ionic-native/camera';
/**
* Generated class for the Registeration page.
*
* See http://ionicframework.com/docs/components/#navigation for more info
* on Ionic pages and navigation.
*/
var Registeration = (function () {
    function Registeration(navCtrl, navParams, registerProvider, loadingCtrl, alrtCtrl, translateService, camera, transfer) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.registerProvider = registerProvider;
        this.loadingCtrl = loadingCtrl;
        this.alrtCtrl = alrtCtrl;
        this.translateService = translateService;
        this.camera = camera;
        this.transfer = transfer;
        this.register = {};
    }
    Registeration.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad Registeration');
    };
    Registeration.prototype.onLogin = function () {
        this.navCtrl.pop();
    };
    Registeration.prototype.onAddImage = function () {
        var _this = this;
        var options = {
            quality: 100,
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        };
        this.camera.getPicture(options).then(function (imageData) {
            _this.base64Image = imageData;
        }, function (err) {
        });
    };
    Registeration.prototype.onAddGallery = function () {
        var _this = this;
        var options = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            sourceType: 0
        };
        this.camera.getPicture(options).then(function (imageData) {
            var base64Images = 'data:image/jpeg;base64,' + imageData;
            _this.base64Image = base64Images;
        }, function (err) {
        });
    };
    Registeration.prototype.onRegister = function () {
        var _this = this;
        var partial = {
            name: this.register.user_name,
            email: this.register.email,
            city: this.register.city,
            contact: this.register.contact_no,
            password: this.register.password
        };
        var mandatory = [];
        if (!partial.name) {
            mandatory.push('Name');
        }
        if (!partial.email) {
            mandatory.push('Email');
        }
        if (!partial.city) {
            mandatory.push('City');
        }
        if (!partial.contact) {
            mandatory.push('Contact Number');
        }
        if (!partial.password) {
            mandatory.push('Password');
        }
        if (mandatory.length > 0) {
            this.alrtCtrl
                .create({ title: "mandatory", message: mandatory.join(','), buttons: ['ok'] })
                .present();
            return;
        }
        this.register.type = "normal";
        var loading = this.loadingCtrl.create({ content: 'Loading' });
        Observable.fromPromise(loading.present())
            .flatMap(function (data) { return _this.registerProvider.register(_this.register); })
            .subscribe(function (data) {
            return loading.dismiss().then(function () {
                _this.register = data;
                if (_this.register.response == true) {
                    var loading_1 = _this.loadingCtrl.create({ content: 'Loading' });
                    Observable.fromPromise(loading_1.present());
                    var options = {
                        fileKey: 'image',
                        fileName: 'name.jpeg',
                        chunkedMode: false,
                    };
                    var fileTransfer = _this.transfer.create();
                    fileTransfer.upload(_this.base64Image, 'http://13.58.3.113/sbv/webserviceprofile_pic/' + _this.register.user_id, options)
                        .then(function (data) {
                        loading_1.dismiss().then(function () {
                            _this.alrtCtrl.create({
                                title: _this.translateService.instant('messages.register'),
                                buttons: [
                                    {
                                        text: 'OK'
                                    }
                                ]
                            }).present();
                        });
                    }, function (err) {
                        loading_1.dismiss().then(function () {
                            _this.alrtCtrl.create({
                                title: "Alert",
                                subTitle: "Something Went Wrong",
                            });
                        });
                    });
                }
            });
        }, function (error) {
            return loading.dismiss().then(function () { });
        });
    };
    return Registeration;
}());
Registeration = __decorate([
    IonicPage(),
    Component({
        selector: 'page-registeration',
        templateUrl: 'registeration.html',
        providers: [Register],
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        Register,
        LoadingController,
        AlertController,
        TranslateService,
        Camera,
        Transfer])
], Registeration);
export { Registeration };
//# sourceMappingURL=registeration.js.map