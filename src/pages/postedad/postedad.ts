import { Component,ViewChild } from '@angular/core';
import {  NavController, NavParams,AlertController,LoadingController,ModalController } from 'ionic-angular';
import {Sellerdetails} from '../sellerdetails/sellerdetails';
import {DomSanitizer} from "@angular/platform-browser";
import {Login} from '../login/login';
import {Observable} from 'rxjs/Rx';
import {SaveItemProvider} from "../../providers/save-item-provider";
import {ReportProvider} from "../../providers/report-provider";
import {ReportModal} from "../report-modal/report-modal";
import { SocialSharing } from '@ionic-native/social-sharing';
import {Postad} from "../postad/postad"


/**
 * Generated class for the Postedad page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */



@Component({
  selector: 'page-postedad',
  templateUrl: 'postedad.html',
  providers: [SaveItemProvider, ReportProvider]
})
export class Postedad {
  @ViewChild('myvideo') myVideo: any;
  data;
  saveitemData;
  id;
  save: any;
  status;
  video;
  // wpage;
  flag;
  reportdata;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private saveitemprovider: SaveItemProvider,
    private reportitemprovider: ReportProvider,
    private loading: LoadingController,
    private domSanitizer: DomSanitizer,
    private alert: AlertController,
    public modalCtrl: ModalController,
    private sharingVar: SocialSharing) {
    this.data = this.navParams.get('pdata');
    this.flag = this.navParams.get('flag');
    // this.wpage=this.navParams.get('wpage')
    this.saveitemData = {};
    this.status = {};
    this.reportdata = {};

  }
  ionViewDidLoad() {

    console.log('ionViewDidLoad Postedad');
  }

  ngOnInit() {
    if (localStorage['aut'] == 'login') {
      this.status.user_id = localStorage['user_id'];
      this.status.post_id = this.data.id;
      let loading = this.loading.create({
        content: 'Loading'
      });
      Observable.fromPromise(loading.present())
        .flatMap(data => this.saveitemprovider.saveitemstatus(this.status))
        .subscribe(data =>
          loading.dismiss().then(() => {
            this.status.response = data;
            if (this.status.response.response == true) {
              // console.log("hi save 1")
              this.save = 1;
            }
            if (this.status.response.response == false) {
              // console.log("hi save 0")
              this.save = 0;
            }

          }),
          error =>
          loading.dismiss().then(() => {})
        );
    } else {
      this.save = 0;
    }

  }

  getSafeUrl(url: any) {
    this.video = this.myVideo.nativeElement;
    return this.domSanitizer.bypassSecurityTrustResourceUrl('http://13.58.3.113/sbv/public/uploads/' + url);

  }
  onTextReply() {
    if (localStorage['aut'] == 'login') {
      this.video.pause();
      this.navCtrl.push(Sellerdetails, {
        userdata: this.data,
        flag: this.flag
      });
    } else {
      this.video.pause();
      this.navCtrl.push(Login, {
        title: 'postedad',
        userdata: this.data,
        flag: this.flag
      })
    }

  }
  onSaveItem() {

    this.saveitemData.user_id = localStorage['user_id'];
    this.saveitemData.post_id = this.data.id;
    let loading = this.loading.create({
      content: 'Loading'
    });
    Observable.fromPromise(loading.present())
      .flatMap(data => this.saveitemprovider.saveitem(this.saveitemData))
      .subscribe(data =>
        loading.dismiss().then(() => {
          this.saveitemData.res = data;
          if (this.saveitemData.res.response == true && this.saveitemData.res.status == 1) {
            this.save = 1;
          } else if (this.saveitemData.res.response == true && this.saveitemData.res.status == 0) {
            this.save = 0;
          }

        }),
        error =>
        loading.dismiss().then(() => {})
      );
  }
  onReport() {
    let modal = this.modalCtrl.create(ReportModal, {
      postid: this.data.id
    })
    modal.present();
    modal.onDidDismiss((data) => {
      this.navCtrl.setRoot(Postad)
    })
    

  }
  onShare() {
    var message = "Look what I found on SellBuyVideo" + "," + "Description" + ":" + this.data.ad_description + "," + "Cost" + ":" + this.data.cost + "," + 'http://13.58.3.113/sbv/add_pages/' + this.data.id;
    var image = "http://13.58.3.113/sbv/public/img/icon.png"
    // alert(message + 'http://13.58.3.113/sbv/public/uploads/'+this.data.video);
    this.sharingVar.share(message, null /*Subject*/ , image, null)
      .then(() => {
          //alert("Success");
        },
        () => {
          //   alert("failed")
        })
  }

}


