var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { Http } from "@angular/http";
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate/ng2-translate';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Registeration } from '../pages/registeration/registeration';
import { Login } from '../pages/login/login';
import { Category } from '../pages/category/category';
import { Details } from '../pages/details/details';
import { Postad } from '../pages/postad/postad';
import { Popup } from '../pages/popup/popup';
import { Postadvideo } from '../pages/postadvideo/postadvideo';
import { Addetails } from '../pages/addetails/addetails';
import { Contactus } from '../pages/contactus/contactus';
import { Aboutus } from '../pages/aboutus/aboutus';
import { Postedad } from '../pages/postedad/postedad';
import { Advancesearch } from '../pages/advancesearch/advancesearch';
import { Sellerdetails } from '../pages/sellerdetails/sellerdetails';
import { MediaCapture } from '@ionic-native/media-capture';
import { Camera } from '@ionic-native/camera';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Forgotpassword } from '../pages/forgotpassword/forgotpassword';
import { Transfer } from '@ionic-native/transfer';
import { AppProvider } from '../providers/app-provider';
import { Userdetails } from '../providers/userdetails';
export function createTranslateLoader(http) {
    return new TranslateStaticLoader(http, 'i18n', '.json');
}
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    NgModule({
        declarations: [
            MyApp,
            HomePage,
            Login,
            Registeration,
            Category,
            Details,
            Postad,
            Popup,
            Postadvideo,
            Addetails,
            Contactus,
            Aboutus,
            Postedad,
            Sellerdetails,
            Advancesearch,
            Forgotpassword,
        ],
        imports: [
            BrowserModule,
            IonicModule.forRoot(MyApp),
            TranslateModule.forRoot({
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [Http]
            }),
        ],
        bootstrap: [IonicApp],
        entryComponents: [
            MyApp,
            HomePage,
            Login,
            Registeration,
            Category,
            Details,
            Postad,
            Popup,
            Postadvideo,
            Addetails,
            Contactus,
            Aboutus,
            Postedad,
            Sellerdetails,
            Advancesearch,
            Forgotpassword
        ],
        providers: [
            StatusBar,
            SplashScreen,
            MediaCapture,
            Camera,
            Facebook,
            GooglePlus,
            SocialSharing,
            Transfer,
            AppProvider,
            Userdetails,
            { provide: ErrorHandler, useClass: IonicErrorHandler }
        ]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map