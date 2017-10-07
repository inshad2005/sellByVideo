import { Component } from '@angular/core';
import {  NavController, NavParams,LoadingController,AlertController } from 'ionic-angular';
import { EmailComposer } from '@ionic-native/email-composer';
import { CallNumber } from '@ionic-native/call-number';
import { SMS } from '@ionic-native/sms';
import {Observable} from "rxjs/Rx";
import { PushProvider } from "../../providers/push-provider"

/**
 * Generated class for the Sellerdetails page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */


@Component({
  selector: 'page-sellerdetails',
  templateUrl: 'sellerdetails.html',
  providers: [PushProvider]
})
export class Sellerdetails {
  data;
  display_div = false;
  flag = 0;
  textData;
  constructor(public navCtrl: NavController, public navParams: NavParams, private callNumber: CallNumber, private emailComposer: EmailComposer, private sms: SMS,
    private pushProvider: PushProvider,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController) {
    this.data = this.navParams.get("userdata");
    this.flag = this.navParams.get('flag');
    this.textData = {};
    // alert(JSON.stringify(this.data))
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Sellerdetails');
  }
  // onCall(){
  //   this.callNumber.callNumber(this.data.contact_no, true)
  //   .then(() => console.log('Launched dialer!'))
  //   .catch(() => console.log('Error launching dialer'));
  // }
  // onEmail(){
  //   let email = {
  //   to: this.data.email,
  //   subject: 'SaleBuyVideo',
  //   body: 'Hi How are you?',
  //   isHtml: true
  // };
  // this.emailComposer.open(email);
  // }
  // onSMS(){
  //   this.sms.send(this.data.contact_no,' ',"INTENT");
  // }
  showdiv() {
    this.display_div = true;
  }
  onSendText() {
    let partial = {
      name: this.textData.message,
    }
    let mandatory: string[] = [];
    if (!partial.name) {
      mandatory.push('Message Field Empty ')
    }
    if (mandatory.length > 0) {
      this.alertCtrl
        .create({
          title: "Mandatory",
          message: mandatory.join(','),
          buttons:[{
            text:'ok'
          }]
        })
        .present()
      return
    }
    this.textData.sender_id = localStorage['user_id'];
    this.textData.receiver_id = this.data.user_id;
    let loading = this.loadingCtrl.create({
      content: 'Loading'
    });
    Observable.fromPromise(loading.present())
      .flatMap(data => this.pushProvider.sendmessage(this.textData))
      .subscribe(data =>
        loading.dismiss().then(() => {
          this.textData.res = data;
          if (this.textData.res.response = true) {
            this.alertCtrl.create({
              title: "Sent",
              subTitle: "Message sent successfully",
              buttons: [{
                text: "ok",
                handler:()=>{
                  this.textData.message="";
                  this.display_div=false;
                }
              }]
            }).present();
          }
        }),
        error =>
        loading.dismiss().then(() => {
          // this.alertCtrl.create({
          //   title: "Something went wrong",
          //   subTitle: "Error while sending message",
          //   buttons: [{
          //     text: "ok"
          //   }]
          // }).present();
        })
      );
  }
}


