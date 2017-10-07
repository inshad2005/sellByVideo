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
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Camera } from '@ionic-native/camera';
/**
 * Generated class for the Details page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var Details = (function () {
    function Details(loadingCtrl, camera, navCtrl, navParams, http, alertCtrl) {
        this.loadingCtrl = loadingCtrl;
        this.camera = camera;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.disable = false;
        this.http = http;
        this.data = {};
        this.data.response = '';
        this.edit = 'false';
        this.email = '';
        this.password = '';
        this.contact = '';
        this.username = '';
        this.location = '';
        this.segment = "MyDetails";
    }
    Details.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad Details');
    };
    Details.prototype.ngOnInit = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: "Please wait..."
        });
        loader.present();
        var link = 'http://13.58.3.113/sbv/webserviceprofile';
        var data = JSON.stringify({
            user_id: localStorage["user_id"],
        });
        this.http.post(link, data)
            .subscribe(function (data) {
            loader.dismiss();
            _this.data.response = data;
            _this.userid = JSON.parse(data._body).password.id;
            _this.username = JSON.parse(data._body).password.user_name;
            _this.email = JSON.parse(data._body).password.email;
            _this.password = JSON.parse(data._body).password.password_text;
            _this.image = JSON.parse(data._body).password.image;
            _this.contact = JSON.parse(data._body).password.contact_no;
            _this.location = JSON.parse(data._body).password.city;
            _this.pic = JSON.parse(data._body).password.image;
            console.log(JSON.parse(data._body).response);
        }, function (error) {
            console.log(error);
        });
    };
    Details.prototype.uploadpic = function (a) {
        var _this = this;
        if (a == 2) {
            this.pic = '';
            this.camera.getPicture({
                quality: 100,
                destinationType: this.camera.DestinationType.DATA_URL,
                encodingType: this.camera.EncodingType.JPEG,
                mediaType: this.camera.MediaType.PICTURE,
                sourceType: 2
            }).then(function (imageData) {
                var base64Image = 'data:image/jpeg;base64,' + imageData;
                _this.pic = base64Image;
            }, function (err) {
                alert(JSON.stringify(err));
            });
        }
        else if (a == 1) {
            this.camera.getPicture({
                quality: 100,
                destinationType: this.camera.DestinationType.DATA_URL,
                encodingType: this.camera.EncodingType.JPEG,
                mediaType: this.camera.MediaType.PICTURE,
            }).then(function (imageData) {
                var base64Image = 'data:image/jpeg;base64,' + imageData;
                _this.pic = base64Image;
            }, function (err) {
                alert('camera not working');
                alert(JSON.stringify(err));
            });
        }
    };
    Details.prototype.editprofile = function () {
        this.disable = !this.disable;
        this.edit = 'true';
    };
    Details.prototype.saveprofile = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: "Please wait..."
        });
        loader.present();
        this.disable = false;
        var link = 'http://13.58.3.113/sbv/webserviceedit_profile';
        var data = JSON.stringify({
            user_id: 2,
            contact_no: this.contact,
            user_name: this.username,
            city: this.location,
            image: this.pic,
        });
        this.http.post(link, data)
            .subscribe(function (data) {
            loader.dismiss();
            _this.data.response = data;
            if (JSON.parse(data._body).response == true) {
                var alert_1 = _this.alertCtrl.create({
                    title: 'Thank You!',
                    subTitle: 'Profile Updated Sucessfully',
                    buttons: ['OK']
                });
                alert_1.present();
                _this.edit = 'false';
            }
            else {
                var alert1 = _this.alertCtrl.create({
                    title: 'Sorry',
                    subTitle: 'Profile not Created',
                    buttons: ['OK']
                });
                alert1.present();
            }
        }, function (error) {
            console.log(error);
        });
    };
    return Details;
}());
Details = __decorate([
    IonicPage(),
    Component({
        selector: 'page-details',
        templateUrl: 'details.html',
    }),
    __metadata("design:paramtypes", [LoadingController,
        Camera, NavController,
        NavParams,
        Http,
        AlertController])
], Details);
export { Details };
//# sourceMappingURL=details.js.map