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
import { Contact } from '../../providers/contact';
import { SocialSharing } from '@ionic-native/social-sharing';
/**
 * Generated class for the Contactus page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var Contactus = (function () {
    function Contactus(navCtrl, navParams, loadingCtrl, contactProvider, alertCtrl, sharingVar) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.contactProvider = contactProvider;
        this.alertCtrl = alertCtrl;
        this.sharingVar = sharingVar;
        this.contact = {};
    }
    Contactus.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad Contactus');
    };
    Contactus.prototype.whatsappShare = function () {
        this.sharingVar.shareViaWhatsApp("Message via WhatsApp", null /*Image*/, "https://www.dropbox.com/s/y87l6dq6rvhljvq/SaleByVideo.apk?dl=0" /* url */)
            .then(function () {
            //alert("Success");
        }, function () {
            // alert("failed")
        });
    };
    Contactus.prototype.twitterShare = function () {
        this.sharingVar.shareViaTwitter("Message via Twitter", null /*Image*/, "https://www.dropbox.com/s/y87l6dq6rvhljvq/SaleByVideo.apk?dl=0")
            .then(function () {
            // alert("Success");
        }, function () {
            //  alert("failed")
        });
    };
    Contactus.prototype.facebookShare = function () {
        this.sharingVar.shareViaFacebook("Message via Twitter", null /*Image*/, "https://www.dropbox.com/s/y87l6dq6rvhljvq/SaleByVideo.apk?dl=0")
            .then(function () {
            //alert("Success");
        }, function () {
            // alert("failed")
        });
    };
    Contactus.prototype.otherShare = function () {
        this.sharingVar.share("Message via Social sharing", null /*Subject*/, null /*File*/, "https://www.dropbox.com/s/y87l6dq6rvhljvq/SaleByVideo.apk?dl=0")
            .then(function () {
            //alert("Success");
        }, function () {
            //   alert("failed")
        });
    };
    Contactus.prototype.Submit = function () {
        var _this = this;
        var partial = {
            email: this.contact.email,
            contact_no: this.contact.contact_no,
            description: this.contact.description,
        };
        var loading = this.loadingCtrl.create({ content: 'Loading' });
        Observable.fromPromise(loading.present())
            .flatMap(function (data) { return _this.contactProvider.contacts(_this.contact); })
            .subscribe(function (data) {
            return loading.dismiss().then(function () {
                _this.contact = data;
                if (_this.contact.response == true) {
                    _this.alertCtrl.create({
                        title: 'Thanks For submitting your query, we will reply you shortly!',
                        buttons: [{
                                text: 'OK',
                                handler: function (data) {
                                    //this.navCtrl.setRoot(Category)
                                }
                            }]
                    }).present();
                }
                else {
                    _this.alertCtrl.create({
                        title: 'Input field required!',
                        buttons: [{
                                text: 'OK',
                                handler: function (data) {
                                    //this.navCtrl.setRoot(Category)
                                }
                            }]
                    }).present();
                }
            });
        }, function (error) {
            return loading.dismiss().then(function () { });
        });
    };
    return Contactus;
}());
Contactus = __decorate([
    IonicPage(),
    Component({
        selector: 'page-contactus',
        templateUrl: 'contactus.html',
        providers: [Contact],
    }),
    __metadata("design:paramtypes", [NavController, NavParams, LoadingController,
        Contact,
        AlertController, SocialSharing])
], Contactus);
export { Contactus };
//# sourceMappingURL=contactus.js.map