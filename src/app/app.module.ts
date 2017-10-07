import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule,Slides } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Http} from "@angular/http";
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate/ng2-translate';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Registeration} from '../pages/registeration/registeration';
import { Login} from '../pages/login/login';
import { Category} from '../pages/category/category';
import { Details} from '../pages/details/details';
import { Postad} from '../pages/postad/postad';
import { Popup} from '../pages/popup/popup';
import { Postadvideo} from '../pages/postadvideo/postadvideo';
import { Addetails} from '../pages/addetails/addetails';
import { Contactus} from '../pages/contactus/contactus';
import { Aboutus} from '../pages/aboutus/aboutus';
import { Postedad} from '../pages/postedad/postedad';
import { Advancesearch} from '../pages/advancesearch/advancesearch';
import { Sellerdetails} from '../pages/sellerdetails/sellerdetails';
import { MediaCapture} from '@ionic-native/media-capture';
import { Camera} from '@ionic-native/camera';
import { Facebook} from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Forgotpassword } from '../pages/forgotpassword/forgotpassword';
import { Transfer } from '@ionic-native/transfer';
import { AppProvider } from '../providers/app-provider';
import { Userdetails } from '../providers/userdetails';
import { Getdetail } from '../providers/getdetail';
import { File } from '@ionic-native/file';
import { CallNumber } from '@ionic-native/call-number';
import { EmailComposer } from '@ionic-native/email-composer';
import { SMS } from '@ionic-native/sms';
import { Network } from '@ionic-native/network';
import { HowItWork } from '../pages/how-it-work/how-it-work';
import { RecentPosts } from "../pages/recent-posts/recent-posts";
import { ReportModal } from "../pages/report-modal/report-modal";
import { Device } from '@ionic-native/device';
import { Inbox } from "../pages/inbox/inbox";
import { LocationFilter } from '../pages/location-filter/location-filter';
import { Geolocation } from '@ionic-native/geolocation';

import { NearByAds } from '../pages/near-by-ads/near-by-ads';

export function createTranslateLoader(http: Http) {
    return new TranslateStaticLoader(http, 'i18n', '.json');
}

@NgModule({
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
    RecentPosts,
    Postedad,
    Sellerdetails,
    Advancesearch,
    Forgotpassword,
    HowItWork,
    ReportModal,
    Inbox,
    LocationFilter,
    NearByAds

    
  ],

  imports: [
      BrowserModule,
      IonicModule.forRoot(MyApp),
      TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]}),  
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
    RecentPosts,
    Advancesearch,
    Forgotpassword,
    HowItWork,
    ReportModal,
    Inbox,
    LocationFilter,
    NearByAds
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
    Getdetail,
    File,
    CallNumber,
    EmailComposer,
    SMS,
    Network,
    Slides,
    Device,
    Geolocation,
    InAppBrowser,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
