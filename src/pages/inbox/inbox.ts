import { Component } from '@angular/core';
import {  NavController, NavParams,LoadingController,AlertController } from 'ionic-angular';
import { PushProvider }  from "../../providers/push-provider";
import { Observable } from "rxjs/Rx"


/**
 * Generated class for the Inbox page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */



@Component({
  selector: 'page-inbox',
  templateUrl: 'inbox.html',
  providers: [PushProvider]
})
export class Inbox {
  textData;
  message;
  reply=false;
  receiver_id;
  sender_id;
  oldMessage;

  constructor(public navCtrl: NavController, public navParams: NavParams, private pushProvider: PushProvider, private loadingCtrl: LoadingController,private alertCtrl:AlertController) {
    this.textData = {};
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Inbox');
  }
  ngOnInit() {

    let loading = this.loadingCtrl.create({
      content: 'Loading'
    });
    Observable.fromPromise(loading.present())
      .flatMap(data => this.pushProvider.recievemessage(this.textData))
      .subscribe(data =>
        loading.dismiss().then(() => {
          this.textData.res = data;
          this.message = data.message;
        }),
        error =>
        loading.dismiss().then(() => {
          // alert(error);
          // alert(JSON.stringify(error))
        })
      );
  }
onDeleteSingle(message){
   let bookdata = {
      "message_id": message.id,
      "user_id": localStorage['user_id'],
      "flag":"single"
    }
   let loading = this.loadingCtrl.create({
      content: 'Loading'
    });
    Observable.fromPromise(loading.present())
      .flatMap(data => this.pushProvider.deleteMessage(bookdata))
      .subscribe(data =>
        loading.dismiss().then(() => {
          this.textData.res = data;
          this.message = this.message.filter(m=>m.id !=message.id);
        }),
        error =>
        loading.dismiss().then(() => {
          // alert(error);
          // alert(JSON.stringify(error))
        })
      );
}
onDeleteAll(){
   let bookdata = {
     
      "user_id": localStorage['user_id'],
      "flag":"all"
    }
    let loading = this.loadingCtrl.create({
      content: 'Loading'
    });
    Observable.fromPromise(loading.present())
      .flatMap(data => this.pushProvider.deleteMessage(bookdata))
      .subscribe(data =>
        loading.dismiss().then(() => {
          this.textData.res = data;
          this.message = [];
        }),
        error =>
        loading.dismiss().then(() => {
          // alert(error);
          // alert(JSON.stringify(error))
        })
      );
}

onReply(message){
  this.reply=true;
  this.sender_id=message.receiver_id;
  this.receiver_id=message.sender_id;
  this.oldMessage=message.message;
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
    this.textData.sender_id = this.sender_id;
    this.textData.receiver_id = this.receiver_id;
    this.textData.title=this.oldMessage;
    // this.textData.message="<q>"+this.oldMessage+"</q></br>"+this.textData.message;
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
                  this.reply=false;
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

  cancelReplyDiv(){
    this.reply=false;
  }

}
