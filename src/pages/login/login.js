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
import { Registeration } from '../registeration/registeration';
import { Category } from '../category/category';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { Observable } from 'rxjs/Rx';
import { LoginProvider } from '../../providers/login';
import { TranslateService } from "ng2-translate/ng2-translate";
import { Forgotpassword } from "../forgotpassword/forgotpassword";
import { AppProvider } from '../../providers/app-provider';
/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var Login = (function () {
    function Login(navCtrl, navParams, fb, googlePlus, loadingCtrl, loginProvider, alertCtrl, translateService, appprovider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.fb = fb;
        this.googlePlus = googlePlus;
        this.loadingCtrl = loadingCtrl;
        this.loginProvider = loginProvider;
        this.alertCtrl = alertCtrl;
        this.translateService = translateService;
        this.appprovider = appprovider;
        this.login = {};
        this.fbData = {};
        this.googleData = {};
    }
    Login.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad Login');
    };
    Login.prototype.onRegisteration = function () {
        this.navCtrl.push(Registeration);
    };
    Login.prototype.onLogin = function () {
        var _this = this;
        var partial = {
            email: this.login.email,
            password: this.login.password
        };
        var mandatory = [];
        if (!partial.email) {
            mandatory.push(this.translateService.instant('register.email'));
        }
        if (!partial.password) {
            mandatory.push(this.translateService.instant('login.pass'));
        }
        if (mandatory.length > 0) {
            this.alertCtrl
                .create({ title: this.translateService.instant('messages.mandatory'), message: mandatory.join(','), buttons: ['ok'] })
                .present();
            return;
        }
        var loading = this.loadingCtrl.create({ content: 'Loading' });
        Observable.fromPromise(loading.present())
            .flatMap(function (data) { return _this.loginProvider.Login(_this.login); })
            .subscribe(function (data) {
            return loading.dismiss().then(function () {
                _this.login = data;
                if (_this.login.response == true) {
                    localStorage['aut'] = 'login';
                    _this.appprovider.current.loginData = _this.login;
                    localStorage['user_id'] = _this.login.user_info.id;
                    _this.alertCtrl.create({
                        title: _this.translateService.instant('messages.loginsuccess'),
                        buttons: [{
                                text: 'OK',
                                handler: function (data) {
                                    _this.navCtrl.setRoot(Category);
                                }
                            }]
                    }).present();
                }
            });
        }, function (error) {
            return loading.dismiss().then(function () { });
        });
    };
    Login.prototype.onLoginWithFb = function () {
        var _this = this;
        this.fb.login(['public_profile', 'user_friends', 'email'])
            .then(function (res) {
            console.log('Logged into Facebook!', res);
            // alert( JSON.stringify (res));
            _this.getdetails();
        })
            .catch(function (e) { return console.log('Error logging into Facebook', e); });
    };
    Login.prototype.getdetails = function () {
        var _this = this;
        // alert('getdetails')
        this.fb.getLoginStatus()
            .then(function (response) {
            if (response.status == "connected") {
                _this.fb.api('/' + response.authResponse.userID + '?fields=id,name,gender,email,picture', [])
                    .then(function (result) {
                    // alert(JSON.stringify(result))
                    _this.fbData.user_name = result.name;
                    _this.fbData.email = result.email;
                    _this.fbData.image = result.picture.data.url;
                    _this.fbData.type = "facebook";
                    _this.fbLogin();
                })
                    .catch(function (e) { return alert(JSON.stringify(e)); });
            }
        });
    };
    Login.prototype.onLoginWithGoogle = function () {
        var _this = this;
        this.googlePlus.login({})
            .then(function (res) {
            console.log(res);
            // alert( JSON.stringify (res))
            _this.googleData.user_name = res.displayName;
            _this.googleData.email = res.email;
            _this.googleData.image = res.imageUrl;
            _this.googleData.type = "google";
            _this.googleLogin();
        })
            .catch(function (err) { return alert(JSON.stringify(err)); });
    };
    Login.prototype.fbLogin = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({ content: 'Loading' });
        Observable.fromPromise(loading.present())
            .flatMap(function (data) { return _this.loginProvider.loginWithFb(_this.fbData); })
            .subscribe(function (data) {
            return loading.dismiss().then(function () {
                _this.fbData = data;
                alert(JSON.stringify(_this.fbData));
                if (_this.fbData.response == true) {
                    localStorage['aut'] = 'login';
                    _this.alertCtrl.create({
                        title: _this.translateService.instant('messages.loginsuccess'),
                        buttons: [{
                                text: 'OK',
                                handler: function (data) {
                                    _this.navCtrl.setRoot(Category);
                                }
                            }]
                    }).present();
                }
            });
        }, function (error) {
            return loading.dismiss().then(function () {
            });
        });
    };
    Login.prototype.googleLogin = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({ content: 'Loading' });
        Observable.fromPromise(loading.present())
            .flatMap(function (data) { return _this.loginProvider.loginWithGoogle(_this.googleData); })
            .subscribe(function (data) {
            return loading.dismiss().then(function () {
                _this.googleData = data;
                alert(JSON.stringify(_this.googleData));
                if (_this.googleData.response == true) {
                    localStorage['aut'] = 'login';
                    _this.alertCtrl.create({
                        title: _this.translateService.instant('messages.loginsuccess'),
                        buttons: [{
                                text: 'OK',
                                handler: function (data) {
                                    _this.navCtrl.setRoot(Category);
                                }
                            }]
                    }).present();
                }
            });
        }, function (error) {
            return loading.dismiss().then(function () {
            });
        });
    };
    Login.prototype.onForgotPassword = function () {
        this.navCtrl.push(Forgotpassword);
    };
    return Login;
}());
Login = __decorate([
    IonicPage(),
    Component({
        selector: 'page-login',
        templateUrl: 'login.html',
        providers: [LoginProvider],
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        Facebook,
        GooglePlus,
        LoadingController,
        LoginProvider,
        AlertController,
        TranslateService,
        AppProvider])
], Login);
export { Login };
//# sourceMappingURL=login.js.map