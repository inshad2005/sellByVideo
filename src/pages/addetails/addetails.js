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
import { IonicPage, NavController, NavParams, AlertController, LoadingController, } from 'ionic-angular';
import { Postedad } from '../postedad/postedad';
import { Observable } from 'rxjs/Rx';
import { Categoryprovider } from '../../providers/categoryprovider';
import { AppProvider } from '../../providers/app-provider';
import { Postdetailprovider } from '../../providers/postdetailprovider';
import { Transfer } from '@ionic-native/transfer';
/**
 * Generated class for the Addetails page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var Addetails = (function () {
    function Addetails(navCtrl, navParams, loadingCtrl, cat, appprovider, transfer, postdetails, alertctrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.cat = cat;
        this.appprovider = appprovider;
        this.transfer = transfer;
        this.postdetails = postdetails;
        this.alertctrl = alertctrl;
        this.imageUrl = this.navParams.get("image");
        this.post_details = {};
    }
    Addetails.prototype.ionViewDidLoad = function () {
    };
    Addetails.prototype.ngOnInit = function () {
        var _this = this;
        console.log('ionViewDidLoad Addetails');
        var loading = this.loadingCtrl.create({ content: 'Loading' });
        Observable.fromPromise(loading.present())
            .flatMap(function (data) { return _this.cat.category(_this.cat); })
            .subscribe(function (data) {
            return loading.dismiss().then(function () {
                _this.category = data.data;
            });
        }, function (error) {
            return loading.dismiss().then(function () { });
        });
        // alert( JSON.stringify(this.appprovider.current.loginData));
        // alert(localStorage['user_id']);
        // alert(this.imageUrl);
        // alert(JSON.stringify(this.imageUrl))
    };
    Addetails.prototype.onPostAd = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({ content: 'Loading' });
        Observable.fromPromise(loading.present());
        var options = {
            fileKey: 'video',
            fileName: 'name.mp4',
        };
        var fileTransfer = this.transfer.create();
        fileTransfer.upload(this.imageUrl, 'http://13.58.3.113/sbv/webservicepost_video', options)
            .then(function (data) { return loading.dismiss().then(function () {
            _this.id = JSON.parse(data.response)['post_id'];
            if (_this.id) {
                _this.post_details.post_id = _this.id;
                _this.post_details.user_id = localStorage['user_id'];
                var loading_1 = _this.loadingCtrl.create({ content: 'Loading' });
                Observable.fromPromise(loading_1.present())
                    .flatMap(function (data) { return _this.postdetails.postdetails(_this.post_details); })
                    .subscribe(function (data) {
                    return loading_1.dismiss().then(function () {
                        _this.post_details = data;
                        if (_this.post_details.response == true) {
                            _this.alertctrl.create({
                                title: "Success",
                                subTitle: "Your Ad has been successfully Posted",
                                buttons: [{
                                        text: 'OK',
                                        handler: function (data) {
                                            _this.navCtrl.push(Postedad);
                                        }
                                    }]
                            }).present();
                        }
                    });
                }, function (error) {
                    return loading_1.dismiss().then(function () {
                        _this.alertctrl.create({
                            title: "Alert",
                            subTitle: "Error While Posting Ad",
                            buttons: [{
                                    text: 'ok'
                                }]
                        }).present();
                    });
                });
            }
            else {
                alert('video not uploaded');
            }
        }); }, function (err) {
            loading.dismiss().then(function () {
                _this.alertctrl.create({
                    title: "Alert",
                    subTitle: "please try again",
                    buttons: [{
                            text: "ok"
                        }]
                }).present();
            });
        });
    };
    return Addetails;
}());
Addetails = __decorate([
    IonicPage(),
    Component({
        selector: 'page-addetails',
        templateUrl: 'addetails.html',
        providers: [Categoryprovider, Postdetailprovider],
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        LoadingController,
        Categoryprovider,
        AppProvider,
        Transfer,
        Postdetailprovider,
        AlertController])
], Addetails);
export { Addetails };
//# sourceMappingURL=addetails.js.map