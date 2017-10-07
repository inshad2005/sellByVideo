import { Component } from '@angular/core';
import { NavController, NavParams,ViewController,ModalController,AlertController } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';

import {Postadvideo} from '../postadvideo/postadvideo';
import {PushProvider} from '../../providers/push-provider';
import {Login} from '../login/login';
import {Inbox} from '../inbox/inbox';
import { LocalNotifications } from '@ionic-native/local-notifications';


/**
 * Generated class for the Postad page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */



@Component({
  selector: 'page-postad',
  templateUrl: 'postad.html',
  providers: [PushProvider, LocalNotifications],
})
export class Postad {
  img: any;
  animation: any;
  click;
  title;
  count: any = 0;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public popoverCtrl: PopoverController,
    private view: ViewController,
    public modalCtrl: ModalController,
    private pushProvider: PushProvider,
    private alert: AlertController,
    private localNotifications: LocalNotifications) {
    this.img = "image_open";
    this.click = 'false';
    this.title = this.navParams.get('title');
    if (this.title == 'divopen') {
      this.click = 'true'
    }
  }
  ngOnInit() {
    this.oncallCount()
  }
  oncallCount() {
    this.pushProvider.messageStatus()
      .subscribe(data => {
        this.count = data.count;
        this.onLocalNotification()
      })
    setTimeout(() => {
      // alert('mukul')
      this.oncallCount()

    }, 1000 * 30);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad Postad');
  }
  onAnimate() {
    this.animation = 'open';

    var d = document.getElementById("ani");
    d.className += " animation";
    setTimeout(() => {
      // alert('mukul')
      this.onImageClick()

    }, 1000);

  }

  onImageClick() {
    if (localStorage['aut'] == 'login') {
      this.click = 'true'
    } else {
      this.navCtrl.push(Login, {
        title: this.click
      });
      //   this.alert.create({
      //     title:'Alert',
      //     subTitle:'Please Login Before Posting Ad',
      //     buttons:[{
      //       text:'ok',
      //       handler:() =>{
      //         this.navCtrl.push(Login,{title:this.click});
      //       }
      //     }]
      //   }).present();

    }

  }

  onTakeVideo() {
    this.navCtrl.push(Postadvideo, {
      info: 'onTake'
    })
    this.click = 'false';
  }
  selectvideo() {
    this.navCtrl.push(Postadvideo, {
      info: 'select'
    })
    this.click = 'false';
  }
  onCount() {
    this.navCtrl.push(Inbox)
  }
  onLocalNotification() {
    if (this.count > 0) {
      this.localNotifications.schedule({
        id: 1,
        title: 'Sell Buy Video Message',
        text: 'You have a new message',
        icon: 'http://13.58.3.113/sbv/public/img/icon.png'
      });

    }

  }
}



