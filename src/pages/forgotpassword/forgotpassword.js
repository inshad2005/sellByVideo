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
import { NavController, LoadingController, IonicPage, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Validators, FormBuilder } from '@angular/forms';
import { Fpswd } from '../../providers/fpswd';
import { Observable } from 'rxjs/Rx';
/**
 * Generated class for the Forgotpassword page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var Forgotpassword = (function () {
    function Forgotpassword(navCtrl, http, alertCtrl, loadingCtrl, formBuilder, faq) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.formBuilder = formBuilder;
        this.faq = faq;
        this.show = false;
        this.show2 = true;
        this.http = http;
        this.data = {};
        var emailRegex = '^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$';
        this.login = {};
        this.form3 = formBuilder.group({
            email: ['', Validators.compose([Validators.maxLength(30), Validators.pattern(emailRegex), Validators.required])],
            old_password: ['', Validators.compose([Validators.maxLength(30), Validators.pattern(''), Validators.required])],
            password: ['', Validators.compose([Validators.maxLength(25), Validators.minLength(6), Validators.pattern(''), Validators.required])],
            confirm_password: ['', Validators.compose([Validators.maxLength(25), Validators.minLength(6), Validators.pattern(''), Validators.required])],
        });
        this.form4 = formBuilder.group({
            username: ['', Validators.compose([Validators.maxLength(30), Validators.pattern(emailRegex), Validators.required])],
        });
    }
    Forgotpassword.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad Forgotpassword');
    };
    Forgotpassword.prototype.forgotpswd_btn = function () {
        var _this = this;
        var partial = {
            email: this.form4.controls["username"].value,
        };
        var loading = this.loadingCtrl.create({ content: 'Loading' });
        Observable.fromPromise(loading.present())
            .flatMap(function (data) {
            return _this.faq.func1(_this.form4.controls["username"].value);
        })
            .subscribe(function (data) {
            return loading.dismiss().then(function () {
                _this.username = data;
                _this.keyid = _this.username.password;
                if (_this.username.response == true) {
                    _this.alertCtrl.create({
                        title: 'Alert',
                        subTitle: 'Please check your mail inbox for Key',
                        buttons: [{
                                text: 'OK',
                                handler: function (data) {
                                }
                            }]
                    }).present();
                    _this.show = true;
                    _this.show2 = false;
                }
                else if (_this.username.response == false) {
                    _this.alertCtrl.create({
                        title: 'Success!',
                        subTitle: 'Email id not Register.',
                        buttons: ['OK']
                    })
                        .present();
                    _this.show = true;
                    _this.show2 = false;
                }
            });
        }, function (error) {
            return loading.dismiss().then(function () { });
        });
    };
    Forgotpassword.prototype.changepswd = function () {
        var _this = this;
        var partiall = {
            new_passwd: this.password,
            confrimPaswrd: this.confirm_password,
            keyide: this.old_password,
        };
        var mandatory = [];
        if (partiall.new_passwd != partiall.confrimPaswrd) {
            mandatory.push('Password & confirm password must be same');
        }
        if (partiall.keyide != this.keyid) {
            mandatory.push('Key Id is not valid');
        }
        if (mandatory.length > 0) {
            this.alertCtrl
                .create({
                title: 'Sorry',
                message: mandatory.join(', '),
                buttons: ['OK']
            })
                .present();
            return;
        }
        var partial = {
            email: this.usernam,
            password: this.password,
        };
        var loading = this.loadingCtrl.create({ content: 'action.processing' });
        Observable.fromPromise(loading.present())
            .flatMap(function (data) { return _this.faq.func2(partial); })
            .subscribe(function (data) {
            return loading.dismiss().then(function () {
                _this.username = data;
                if (_this.username.response == true) {
                    _this.alertCtrl.create({
                        title: 'Success',
                        subTitle: 'Pasword Successfuly Changed..',
                        buttons: [{
                                text: 'OK',
                                handler: function (data) {
                                }
                            }]
                    }).present();
                    _this.show = true;
                    _this.show2 = false;
                }
                else if (_this.username.response == false) {
                    _this.alertCtrl.create({
                        title: 'Sorry!',
                        subTitle: 'Try again.',
                        buttons: ['OK']
                    })
                        .present();
                    _this.show = true;
                    _this.show2 = false;
                }
            });
        }, function (error) {
            return loading.dismiss().then(function () { });
        });
    };
    return Forgotpassword;
}());
Forgotpassword = __decorate([
    IonicPage(),
    Component({
        selector: 'page-forgotpassword',
        templateUrl: 'forgotpassword.html',
        providers: [Fpswd]
    }),
    __metadata("design:paramtypes", [NavController,
        Http,
        AlertController,
        LoadingController,
        FormBuilder,
        Fpswd])
], Forgotpassword);
export { Forgotpassword };
//# sourceMappingURL=forgotpassword.js.map