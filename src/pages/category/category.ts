import { Component } from '@angular/core';
import {  NavController, NavParams,AlertController,LoadingController} from 'ionic-angular';
import { Postad} from '../postad/postad';
import { Observable } from 'rxjs/Rx';
import { Categoryprovider } from '../../providers/categoryprovider';
import { Advancesearch } from '../advancesearch/advancesearch';
import { LocationFilter } from '../location-filter/location-filter';


/**
 * Generated class for the Category page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

declare var navigator: any;
declare var Connection: any;


@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
  providers: [Categoryprovider],
})

export class Category {
  category: any;
  categorydata
  myInput;


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private loadingCtrl: LoadingController,
    public alrtCtrl: AlertController, private cat: Categoryprovider) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Category');

    let loading = this.loadingCtrl.create({
      content: 'Loading'
    });
    Observable.fromPromise(loading.present())
      .flatMap(data => this.cat.category(this.cat))
      .subscribe(data =>
        loading.dismiss().then(() => {
          this.category = data.data
          this.categorydata = this.category
        }),
        error =>
        loading.dismiss().then(() => {})
      );
  }

  onPostad() {
    this.navCtrl.push(Postad);
  }
  search() {
    console.log(this.myInput)
    if (this.myInput == '') {
      this.category = this.categorydata;
      return;
    }
    let ev = this.myInput
    if (ev && ev.trim() != '') {
      this.category = this.categorydata.filter((value) => {
        return (value.category.toUpperCase().indexOf(ev.toUpperCase()) > -1);
      })
    } else {
      this.category = this.categorydata;
    }
    console.log(this.category)
  }

  advance(category) {
    this.navCtrl.push(Advancesearch, {
      cat: category
    });
  }

  onFilter() {
    this.navCtrl.push(LocationFilter);
  }

}


