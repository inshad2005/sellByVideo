import { Component, ViewChild } from '@angular/core';
import { Nav, Platform,AlertController ,MenuController,Events,ToastController,} from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ENV } from './env';
import { HomePage } from '../pages/home/home';
import { Login } from '../pages/login/login';
import { Details }from '../pages/details/details';
import { Category } from '../pages/category/category';
import { Postad } from '../pages/postad/postad';
import { HowItWork }from '../pages/how-it-work/how-it-work' 
import { Contactus } from '../pages/contactus/contactus';
import { Aboutus } from '../pages/aboutus/aboutus';
import { RecentPosts } from "../pages/recent-posts/recent-posts";
import { AppProvider } from "../providers/app-provider";
import { PushProvider } from '../providers/push-provider';
import { Inbox } from "../pages/inbox/inbox";
import { TranslateService } from 'ng2-translate';



@Component({
  templateUrl: 'app.html',
  providers: [PushProvider],
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  disable = false;
  counter = 0;
  pages: Array < {
    title: string,
    component ? : any
  } > ;

  constructor(public platform: Platform, public statusBar: StatusBar,
    public splashScreen: SplashScreen, public translateService: TranslateService,
    private menuController: MenuController,
    private alertCtrl: AlertController,
    private events: Events,
    private pushProvider: PushProvider,
    private network: Network,
    private toastctrl: ToastController,
    private appProvider: AppProvider,
  ) {
    this.initializeApp();
    // used for an example of ngFor and navigation
    this.pages = [{
        title: 'Home',
        component: Postad
      },
      {
        title: 'Profile',
        component: Details
      },
      {
        title: 'Recent Posts',
        component: RecentPosts
      },
      {
        title: 'Categories',
        component: Category
      },
      {
        title: 'Inbox',
        component: Inbox
      },
      {
        title: 'How It Works',
        component: HowItWork
      },
      {
        title: 'Contact Us',
        component: Contactus
      },
      {
        title: 'About Us',
        component: Aboutus
      }
    ];
    this.events.subscribe('user:created', () => {
      this.disable = true;
    });
    this.statusBar.backgroundColorByHexString('#E25822');
  }

  initializeApp() {
    this.translateService.setDefaultLang(ENV.language);
    this.translateService.use(ENV.language)
    this.platform.ready().then(() => {
      let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
        this.toastctrl.create({
          message: 'No Network Connection',
          duration: 3000
        }).present();
      })
      this.platform.registerBackButtonAction(() => {
        if (this.counter == 0 && this.nav.canGoBack()) {
          this.nav.pop()
        }
        // else if(this.counter==1 && this.nav.canGoBack())
        // {
        //   this.nav.pop()
        // }
        else {
          this.counter++;
          this.exit();
        }
      })
      if (localStorage['aut'] == 'login') {
        this.rootPage = Postad;
        this.appProvider.current.loginFlag = localStorage['loginflag'];
        this.events.publish('user:created');
      } else {
        this.rootPage = HomePage;
        this.appProvider.current.loginFlag = localStorage['loginflag'];
      }
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });


  }

  openPage(page) {
    if (page.title == 'Home') {
      if (localStorage['aut'] == 'login') {
        this.nav.setRoot(Postad);
      } else {
        this.nav.setRoot(Login, {
          title: page.title
        });
      }
    } else if (page.title == 'Profile') {
      if (localStorage['aut'] == 'login') {
        this.nav.setRoot(Details);
      } else {
        this.nav.setRoot(Login, {
          title: page.title
        });
      }
      // code...
    } else if (page.title == 'Inbox') {
      if (localStorage['aut'] == 'login') {
        this.nav.setRoot(Inbox);
      } else {
        this.nav.setRoot(Login, {
          title: page.title
        });
      }
      // code...
    } else {
      this.nav.setRoot(page.component);
    }
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario

  }
  onLogout() {
    this.disable = false;
    if (this.menuController.isOpen()) {
      this.menuController.close();
    }
    this.nav.setRoot(HomePage).then(() => {
      localStorage.clear()
    });


  }
  exit() {
    if (this.menuController.isOpen()) {
      this.menuController.close();
    }
    if (this.counter == 1) {
      let alertCtrl = this.alertCtrl.create({
        title: 'Confirm',
        message: 'Do you want to exit?',
        buttons: [{
          text: "exit?",
          handler: () => {
            this.exitApp()
          }
        }, {
          text: "Cancel",
          role: 'cancel',
          handler: () => {
            this.counter--;
          }
        }]
      })
      alertCtrl.present();
    } else {
      this.exitApp();
    }
  }
  exitApp() {
    this.platform.exitApp();
  }

}


