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
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ENV } from './env';
import { HomePage } from '../pages/home/home';
import { Details } from '../pages/details/details';
import { Category } from '../pages/category/category';
import { Contactus } from '../pages/contactus/contactus';
import { Aboutus } from '../pages/aboutus/aboutus';
import { Advancesearch } from '../pages/advancesearch/advancesearch';
import { TranslateService } from 'ng2-translate';
var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen, translateService) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.translateService = translateService;
        this.initializeApp();
        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Home', component: Category },
            { title: 'Details', component: Details },
            { title: 'Advance Search', component: Advancesearch },
            { title: 'Contact Us', component: Contactus },
            { title: 'About Us', component: Aboutus }
        ];
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.translateService.setDefaultLang(ENV.language);
        this.translateService.use(ENV.language);
        this.platform.ready().then(function () {
            if (localStorage['aut'] == 'login') {
                _this.rootPage = Category;
            }
            else {
                _this.rootPage = HomePage;
            }
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    };
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    };
    return MyApp;
}());
__decorate([
    ViewChild(Nav),
    __metadata("design:type", Nav)
], MyApp.prototype, "nav", void 0);
MyApp = __decorate([
    Component({
        templateUrl: 'app.html'
    }),
    __metadata("design:paramtypes", [Platform, StatusBar, SplashScreen, TranslateService])
], MyApp);
export { MyApp };
//# sourceMappingURL=app.component.js.map