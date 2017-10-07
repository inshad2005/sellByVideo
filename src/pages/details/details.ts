
import {Component} from '@angular/core';
import {NavController,NavParams,} from 'ionic-angular';
import {AlertController} from 'ionic-angular';
import {LoadingController} from 'ionic-angular';
import {Http} from '@angular/http';
import {Camera} from '@ionic-native/camera';
import {Getdetail} from '../../providers/getdetail';
import {Observable} from 'rxjs/Rx';
import {DomSanitizer} from "@angular/platform-browser";
import {AppProvider} from "../../providers/app-provider";
import {SavedAd} from "../../providers/saved-ad";
import {Postedad} from "../postedad/postedad"


/**
 * Generated class for the Details page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */



@Component({
    selector: 'page-details',
    templateUrl: 'details.html',
    providers: [SavedAd]
})
export class Details {

    segment;
    data;
    http;
    userid;
    username
    email;
    password;
    image;
    contact;
    disable = false;
    disableadd = false;
    edit;
    name;
    location;
    pic;
    add_data;
    adddata;
    editaddbtn
    zip_code
    savedata;
    ads;

    constructor(public loadingCtrl: LoadingController,
        private camera: Camera, public navCtrl: NavController,
        public navParams: NavParams,
        http: Http,
        public alertCtrl: AlertController,
        private getdetailProvider: Getdetail,
        private domSanitizer: DomSanitizer,
        private appProvider: AppProvider,
        private savedadprovider: SavedAd) {
        this.http = http;
        this.data = {};
        this.data.response = '';
        this.edit = 'false';
        this.email = '';
        this.password = '';
        this.contact = '';
        this.name = '';
        this.zip_code = ''
        this.location = '';
        this.editaddbtn = 'true';
        this.segment = "MyDetails";
        this.savedata = {};
    }

    ionViewDidLoad() {

        console.log('ionViewDidLoad Details');
    }
    ngOnInit() {
        if (localStorage['aut'] == 'login') {
            let loader = this.loadingCtrl.create({
                content: "Please wait..."
            });
            loader.present();
            var link = 'http://13.58.3.113/sbv/webserviceprofile';
            var data = JSON.stringify({
                user_id: localStorage['user_id'],
            });
            this.http.post(link, data)
                .subscribe(data => {
                    loader.dismiss();
                    this.data.response = data;
                    this.userid = JSON.parse(data._body).password.id;
                    this.name = JSON.parse(data._body).password.name;
                    this.email = JSON.parse(data._body).password.email;
                    this.password = JSON.parse(data._body).password.password_text;
                    this.image = JSON.parse(data._body).password.image;
                    this.contact = JSON.parse(data._body).password.contact_no;
                    this.location = JSON.parse(data._body).password.city;
                    this.zip_code = JSON.parse(data._body).password.zip_code;
                    console.log(JSON.parse(data._body).response);
                    if (this.appProvider.current.loginFlag=='email') {
                        // code...
                        this.pic ='http://13.58.3.113/sbv/public/upload/users/'+JSON.parse(data._body).password.image;
                    }else{
                         this.pic=JSON.parse(data._body).password.image;
                    }
                }, error => {
                    console.log(error);
                });
            let partial = {
                user_id: localStorage['user_id'],

            }


            let loading = this.loadingCtrl.create({
                content: 'Please wait...'
            });
            Observable.fromPromise(loading.present())
                .flatMap(data => this.getdetailProvider.Getdetail(partial))
                .subscribe(data =>
                    loading.dismiss().then(() => {
                        this.add_data = data;
                        this.adddata = this.add_data.ad_information;

                    }),
                    error =>
                    loading.dismiss().then(() => {})
                );

        } else {

        }


    }
    uploadpic(a) {
        if (a == 2) {
            this.pic = '';
            this.camera.getPicture({
                quality: 75,
                destinationType: this.camera.DestinationType.DATA_URL,
                encodingType: this.camera.EncodingType.JPEG,
                mediaType: this.camera.MediaType.PICTURE,
                sourceType: 2
            }).then((imageData) => {

                let base64Image = 'data:image/jpeg;base64,' + imageData;
                this.pic = base64Image;
                // alert(JSON.stringify(this.pic));

            }, (err) => {

                //alert(JSON.stringify(err))
            });

        } else if (a == 1) {

            this.camera.getPicture({
                quality: 75,
                destinationType: this.camera.DestinationType.DATA_URL,
                encodingType: this.camera.EncodingType.JPEG,
                mediaType: this.camera.MediaType.PICTURE,

            }).then((imageData) => {

                let base64Image = 'data:image/jpeg;base64,' + imageData;
                this.pic = base64Image;

            }, (err) => {
                // alert('camera not working')
                //alert(JSON.stringify(err))
            });

        }
    }

    editprofile() {
        this.disable = !this.disable;
        this.edit = 'true';
    }

    saveprofile() {
        let loader = this.loadingCtrl.create({
            content: "Please wait..."
        });
        loader.present();
        this.disable = false;
        var link = 'http://13.58.3.113/sbv/webserviceedit_profile';
        var data = JSON.stringify({
            user_id: localStorage['user_id'],
            contact_no: this.contact,
            name: this.name,
            city: this.location,
            image: this.pic,
        });
        this.http.post(link, data)
            .subscribe(data => {
                loader.dismiss();
                this.data.response = data;
                if (JSON.parse(data._body).response == true) {
                    let alert = this.alertCtrl.create({
                        title: 'Thank You!',
                        subTitle: 'Profile Updated Sucessfully',
                        buttons: [{
                                text: 'ok',
                                handler: () => {
                                    this.edit = 'true';
                                }
                            }

                        ]
                    });
                    alert.present();
                    this.edit = 'false';
                } else {
                    let alert1 = this.alertCtrl.create({
                        title: 'Sorry',
                        subTitle: 'Profile not Created',
                        buttons: ['OK']
                    });
                    alert1.present();
                }
            }, error => {
                loader.dismiss();
                // alert(error);
                // alert(JSON.stringify(error))
            });
    }
    editadd() {
        this.disableadd = !this.disableadd;
        this.editaddbtn = 'false';
    }

    saveadd(post_id, title, description, cost, category, location) {

        let partial = {
            user_id: localStorage['user_id'],
            post_id: post_id,
            category: category,
            ad_title: title,
            ad_description: description,
            cost: cost,
            location: location,

        }


        let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        Observable.fromPromise(loading.present())
            .flatMap(data => this.getdetailProvider.Updatedetail(partial))
            .subscribe(data =>
                loading.dismiss().then(() => {
                    this.add_data = data;
                    if (this.add_data.response == true) {
                        this.editaddbtn = 'true';
                        this.disableadd = false;
                        let alert = this.alertCtrl.create({
                            title: 'Thank You!',
                            subTitle: 'Post Updated Sucessfully',
                            buttons: ['OK']
                        });
                        alert.present();
                    }

                }),
                error =>
                loading.dismiss().then(() => {})
            );
    }
    getSafeUrl(url: any) {

        return this.domSanitizer.bypassSecurityTrustResourceUrl('http://13.58.3.113/sbv/public/uploads/' + url);
    }
    onSavedAd() {
        let loading = this.loadingCtrl.create({
            content: 'Loading'
        });
        Observable.fromPromise(loading.present())
            .flatMap(data => this.savedadprovider.saveditem(this.savedata))
            .subscribe(data =>
                loading.dismiss().then(() => {
                    this.savedata.res = data;
                    this.ads = data.message;
                    // alert(JSON.stringify (this.ads.message));

                }),
                error =>
                loading.dismiss().then(() => {})
            );
    }
    onclickAd(p) {
        // alert(JSON.stringify(p))
        this.navCtrl.push(Postedad, {
            pdata: p
        });
    }

    onDeleteSaveItem(p){
        let reqData={
            user_id :localStorage['user_id'],
            post_id : p.id
        }
         // reqData.user_id = localStorage['user_id'];
         // reqData.post_id = p.id;
          let loading = this.loadingCtrl.create({
            content: 'Loading'
        });
        Observable.fromPromise(loading.present())
            .flatMap(data => this.savedadprovider.deleteSaveItem(reqData))
            .subscribe(data =>
                loading.dismiss().then(() => {
                   /// this.savedata.res = data;
                     this.ads = this.ads.filter(f=>f.id !=p.id)
                    // alert(JSON.stringify (this.ads.message));

                }),
                error =>
                loading.dismiss().then(() => {})
            );
    }
    OnDeletePostAdd(p){
      let reqData={
            user_id :localStorage['user_id'],
            post_id : p.id
        }
         // reqData.user_id = localStorage['user_id'];
         // reqData.post_id = p.id;
          let loading = this.loadingCtrl.create({
            content: 'Loading'
        });
        Observable.fromPromise(loading.present())
            .flatMap(data => this.savedadprovider.deletePostAdd(reqData))
            .subscribe(data =>
                loading.dismiss().then(() => {
                   /// this.savedata.res = data;
                    this.adddata = this.adddata.filter(f=>f.id !=p.id)
                    // alert(JSON.stringify (this.ads.message));

                }),
                error =>
                loading.dismiss().then(() => {})
            );
    }
}

