import { Component } from '@angular/core';
import {  NavController, NavParams,ViewController,LoadingController,AlertController } from 'ionic-angular';
import {ReportProvider} from "../../providers/report-provider";
import {Observable} from 'rxjs/Rx';
import {Postad} from "../postad/postad" ;

/**
 * Generated class for the ReportModal page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */



@Component({
  selector: 'page-report-modal',
  templateUrl: 'report-modal.html',
  providers: [ReportProvider]
})
export class ReportModal {
  reportdata;
  postId;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private reportitemprovider: ReportProvider,
    private loading: LoadingController,
    private alertCtrl: AlertController) {
    this.reportdata = {};
    this.postId = this.navParams.get("postid")
    this.reportdata.description = "Product already sold";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportModal');
  }
  oncancel() {
    this.viewCtrl.dismiss();
  }
  onReport() {
    this.reportdata.user_id = localStorage['user_id'];
    this.reportdata.post_id = this.postId;

    let loading = this.loading.create({
      content: 'Loading'
    });
    Observable.fromPromise(loading.present())
      .flatMap(data => this.reportitemprovider.reportprovider(this.reportdata))
      .subscribe(data =>
        loading.dismiss().then(() => {
          this.reportdata.res = data;
          if (this.reportdata.res.response == true) {
            this.alertCtrl.create({
              title: "Report Accepted",
              subTitle: "your report has been accepted we will contact you soon",
              buttons: [{
                text: "ok",
                handler: () => {
                  this.viewCtrl.dismiss();
                  
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


