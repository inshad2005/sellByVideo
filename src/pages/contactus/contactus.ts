import { Component } from '@angular/core';
import {  NavController, NavParams,LoadingController, AlertController } from 'ionic-angular';
import {Observable} from 'rxjs/Rx';
import {Contact} from '../../providers/contact';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Category } from '../category/category';
import { Device } from '@ionic-native/device';
import { InAppBrowser } from '@ionic-native/in-app-browser';



/**
 * Generated class for the Contactus page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */



@Component({
  selector: 'page-contactus',
  templateUrl: 'contactus.html',
  providers: [Contact],
})
export class Contactus {
  contact: any;
  contactFormData:any;
  messgeLinkAndroid = "https://play.google.com/store/apps/details?id=io.ionic.SellBuyVideo&hl=en";
  messgeLinkIos ="https://itunes.apple.com/us/app/sellbuyvideo/id1263360219?ls=1&mt=8";
  constructor(public navCtrl: NavController, public navParams: NavParams, private loadingCtrl: LoadingController,
    private contactProvider: Contact,
    private alertCtrl: AlertController, private sharingVar: SocialSharing,
    private device: Device,
    private iab: InAppBrowser) {
    this.contact = {};
    this.contactFormData={};
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Contactus');
  }
  whatsappShare() {
    // if (this.device.platform == "Android") {
    //     this.sharingVar.shareViaWhatsApp("SellBuyVideo Download Link" + "," + this.messgeLinkAndroid, null /*Image*/ , null /* url */ )
    //       .then(() => {
    //           //alert("Success");
    //         },
    //         () => {
    //           // alert("failed")
    //         })
    //   }
    //   else if (this.device.platform=="iOS") {
    //      this.sharingVar.shareViaWhatsApp("SellBuyVideo Download Link" + "," + this.messgeLinkIos, null /*Image*/ , null /* url */ )
    //       .then(() => {
    //           //alert("Success");
    //         },
    //         () => {
    //           // alert("failed")
    //         })
    //   }
    }
  instagram(){
   const browser = this.iab.create('https://www.instagram.com/sellbuyvideo');
  }
  twitterShare() {
    const browser = this.iab.create('https://www.twitter.com/sellbuyvideo');
    // if (this.device.platform=="Android") {
    //       this.sharingVar.shareViaTwitter("SellBuyVideo Download Link" + "," + this.messgeLinkAndroid, null /*Image*/ , null)
    //   .then(() => {
    //       // alert("Success");
    //     },
    //     () => {
    //       //  alert("failed")
    //     })// code...
    // }
    // else if (this.device.platform=="iOS") {
    //      this.sharingVar.shareViaTwitter("SellBuyVideo Download Link" + "," + this.messgeLinkIos, null /*Image*/ , null)
    //   .then(() => {
    //       // alert("Success");
    //     },
    //     () => {
    //       //  alert("failed")
    //     }) // code...
    // }
    
  }
  facebookShare() {
    const browser = this.iab.create('https://www.facebook.com/sellbuyvideo/');
    // if (this.device.platform=="Android") {
    //    this.sharingVar.shareViaFacebook("SellBuyVideo Download Link" + "," + this.messgeLinkAndroid, null /*Image*/ , null)
    //   .then(() => {
    //       //alert("Success");
    //     },
    //     () => {
    //       // alert("failed")
    //     })
    // }
    // else if (this.device.platform=="iOS") {
    //    this.sharingVar.shareViaFacebook("SellBuyVideo Download Link" + "," + this.messgeLinkIos, null /*Image*/ , null)
    //   .then(() => {
    //       //alert("Success");
    //     },
    //     () => {
    //       // alert("failed")
    //     })
    // }
   
  }
  // otherShare() {
  //   if (this.device.platform=="Android") {
  //      this.sharingVar.share("SellBuyVideo  Download Link" + "," + this.messgeLinkAndroid, null /*Subject*/ , null /*File*/ , null)
  //     .then(() => {
  //         //alert("Success");
  //       },
  //       () => {
  //         //   alert("failed")
  //       })
  //   }
  //   else if (this.device.platform=="iOS") {
  //     this.sharingVar.share("SellBuyVideo  Download Link" + "," + this.messgeLinkIos, null /*Subject*/ , null /*File*/ , null)
  //     .then(() => {
  //         //alert("Success");
  //       },
  //       () => {
  //         //   alert("failed")
  //       })
  //   }
   

  // }
  Submit(a) {
    let loading = this.loadingCtrl.create({
      content: 'Loading'
    });
    Observable.fromPromise(loading.present())
      .flatMap(data => this.contactProvider.contactsMessage(this.contactFormData))
      .subscribe(data =>
        loading.dismiss().then(() => {
          if (data.response == true) {
          this.contactFormData = data
            this.alertCtrl.create({
              title: 'Thanks For your message, we will reply Soon!',
              buttons: [{
                text: 'OK',
                handler: data => {
                  this.navCtrl.setRoot(Category)
                }
              }]
            }).present();
            //this.navCtrl.setRoot(Category)
          } else {
            this.alertCtrl.create({
              title: 'Error While Submitting Report, Please Try Again Later',
              buttons: [{
                text: 'OK',
                handler: data => {
                  // this.navCtrl.setRoot(Category)
                }
              }]
            }).present();
          }
        }),
        error =>
        loading.dismiss().then(() => {})
      );

  }

}

