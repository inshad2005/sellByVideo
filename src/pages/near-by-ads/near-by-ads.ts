import { Component } from '@angular/core';
import {  NavController, NavParams,LoadingController,AlertController } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';
import { LocationFilterProvider } from "../../providers/location-filter-provider";
import { AppProvider } from '../../providers/app-provider';
import { Postedad } from "../postedad/postedad";
/**
 * Generated class for the NearByAds page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */



@Component({
  selector: 'page-near-by-ads',
  templateUrl: 'near-by-ads.html',
  providers: [LocationFilterProvider, AppProvider]
})
export class NearByAds {
  locationData;
  longitude;
  latitude;
  distance;
  ads;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private locationFilterProvider: LocationFilterProvider,
    private appProvider: AppProvider,
    private loading: LoadingController,
    private alertCtrl: AlertController) {
    this.longitude = this.navParams.get('longitude');
    this.latitude = this.navParams.get('latitude');
    this.distance = this.navParams.get('miles')
    // alert(this.longitude);
    // alert(this.latitude);
    // alert(this.distance);
    this.locationData = {};
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NearByAds');
  }

  ngOnInit() {


    this.locationData.lng = this.longitude;
    this.locationData.lat = this.latitude;
    this.locationData.miles = this.distance;
    let loading = this.loading.create({
      content: 'Loading'
    });
    Observable.fromPromise(loading.present())
      .flatMap(data => this.locationFilterProvider.nearBy(this.locationData))
      .subscribe(data =>
        loading.dismiss().then(() => {
          this.locationData.res = data;
          this.ads = data.data;
          // alert(JSON.stringify(this.locationData.res))  
        }),
        error =>
        loading.dismiss().then(() => {
          this.alertCtrl.create({
            title: "alert!",
            subTitle: "Something Went Wrorg Please Try Again Later",
            buttons: [{
              text: 'ok'
            }]
          })
        })
      );
  }
  onclickAd(p) {
    this.navCtrl.push(Postedad, {
      pdata: p
    });
  }


}


