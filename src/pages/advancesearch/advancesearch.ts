import { Component } from '@angular/core';
import {  NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { Http } from '@angular/http';
import { AlertController} from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Postedad } from '../postedad/postedad' ;
import { DomSanitizer } from "@angular/platform-browser";


/**
 * Generated class for the Advancesearch page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */


@Component({
  selector: 'page-advancesearch',
  templateUrl: 'advancesearch.html',
})
export class Advancesearch {
  data;
  http;
  check;
  category;
  newCheck=[];
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    http: Http,
    public alertCtrl: AlertController,
    private actionSheetCtrl: ActionSheetController,
    private domSanitizer: DomSanitizer) {
    this.http = http;
    this.data = {};
    this.data.response = '';
    this.category = this.navParams.get('cat');
    // alert(this.category);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Advancesearch');
  }
  ngOnInit() {
    var a = "null";
    console.log("hi");

    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    var link = 'http://13.58.3.113/sbv/webservicecategory_ad/' + a;

    this.http.get(link)
      .subscribe(data => {
        loader.dismiss();
        this.check = JSON.parse(data._body).ad_details;
        for(var i=0; i< this.check.length; i++){
          var obj=this.check[i];
          if (obj.post_category==this.category) {
            // code...
            this.newCheck.push(obj)
          }
        }
        //  alert(JSON.stringify(this.check));
        this.data.response = data;
      }, error => {
        console.log(error);
      });

  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'SORT BY',
      buttons: [{

          text: 'New',

          handler: () => {
            let loader = this.loadingCtrl.create({
              content: "Please wait..."
            });
            loader.present();
            var link = 'http://13.58.3.113/sbv/webservicecategory_ad/' + 'new';

            this.http.get(link)
              .subscribe(data => {
                this.newCheck=[];
                loader.dismiss();
                this.check = JSON.parse(data._body).ad_details;
                for(var i=0; i< this.check.length; i++){
                  var obj=this.check[i];
                  if (obj.post_category==this.category) {
                    // code...
                    this.newCheck.push(obj)
                  }
                }
                //    alert(JSON.stringify(this.check));
                this.data.response = data;
              }, error => {
                console.log(error);
              });
          }
        },
        {
          text: 'Old',

          handler: () => {
            let loader = this.loadingCtrl.create({
              content: "Please wait..."
            });
            loader.present();
            var link = 'http://13.58.3.113/sbv/webservicecategory_ad/' + 'old';

            this.http.get(link)
              .subscribe(data => {
                this.newCheck=[];
                loader.dismiss();
                this.check = JSON.parse(data._body).ad_details;
                for(var i=0; i< this.check.length; i++){
                  var obj=this.check[i];
                  if (obj.post_category==this.category) {
                    // code...
                    this.newCheck.push(obj)
                  }
                }
                //    alert(JSON.stringify(this.check));
                this.data.response = data;
              }, error => {
                console.log(error);
              });

          }
        },
        {
          text: 'Price -- Low to High',
          handler: () => {
            let loader = this.loadingCtrl.create({
              content: "Please wait..."
            });
            loader.present();
            var link = 'http://13.58.3.113/sbv/webservicecategory_ad/' + 'lth';

            this.http.get(link)
              .subscribe(data => {
                this.newCheck=[];
                loader.dismiss();
                this.check = JSON.parse(data._body).ad_details;
              for(var i=0; i< this.check.length; i++){
                var obj=this.check[i];
                if (obj.post_category==this.category) {
                  // code...
                  this.newCheck.push(obj)
                }
              }
                //    alert(JSON.stringify(this.check));
                this.data.response = data;
              }, error => {
                console.log(error);
              });
          }
        },
        {
          text: 'Price -- High to Low',
          handler: () => {
            let loader = this.loadingCtrl.create({
              content: "Please wait..."
            });
            loader.present();
            var link = 'http://13.58.3.113/sbv/webservicecategory_ad/' + 'htl';

            this.http.get(link)
              .subscribe(data => {
                this.newCheck=[];
                loader.dismiss();
                this.check = JSON.parse(data._body).ad_details;
                for(var i=0; i< this.check.length; i++){
                  var obj=this.check[i];
                  if (obj.post_category==this.category) {
                    // code...
                    this.newCheck.push(obj)
                  }
                }
                //    alert(JSON.stringify(this.check));
                this.data.response = data;
              }, error => {
                console.log(error);
              });
          }
        }
      ]
    });

    actionSheet.present();
  }
  onclickAd(p) {

    this.navCtrl.push(Postedad, {
      pdata: p,
      flag: 1
    });
  }
  // isHttp(img){
  //  alert(img)

  // if(img.includes('http')){
  //     return 1;
  //   }  
  //   else{
  //     return 0;
  //   }
  // }
  getSafeUrl(url: any) {
    return this.domSanitizer.bypassSecurityTrustResourceUrl('http://13.58.3.113/sbv/public/uploads/' + url);
  }

}


