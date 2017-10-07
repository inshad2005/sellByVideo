import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController, AlertController } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';
import { About } from '../../providers/about';
import { InAppBrowser } from '@ionic-native/in-app-browser';


/**
 * Generated class for the Aboutus page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */



@Component({
  selector: 'page-aboutus',
  templateUrl: 'aboutus.html',
  providers: [About],
})
export class Aboutus {
  about: any;
  about_data;
  a;
  term;
  segment;
  constructor(public navCtrl: NavController, public navParams: NavParams, private loadingCtrl: LoadingController,
    private aboutProvider: About,
    private alertCtrl: AlertController,
    private iab: InAppBrowser
  ) {
    this.term=this.navParams.get('a');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Aboutus');
  }

  ngOnInit() {
    if(this.term){
      this.segment="terms";
    }
    else{
      let loading = this.loadingCtrl.create({
      content: 'Loading'
    });
    Observable.fromPromise(loading.present())
      .flatMap(data => this.aboutProvider.Abouts())
      .subscribe(data =>
        loading.dismiss().then(() => {
          this.about = data;
          this.about_data = data.about_us.content;
          //alert(JSON.stringify(this.about));

        }),
        error =>
        loading.dismiss().then(() => {})
      );
    }
  }

  hideContent() {
    this.a = 'false';
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
}

