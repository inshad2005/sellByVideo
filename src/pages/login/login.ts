import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController, AlertController,Events } from 'ionic-angular';
import { Registeration } from '../registeration/registeration' ;

import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import {Observable} from 'rxjs/Rx';
import {LoginProvider} from '../../providers/login';
import {TranslateService} from "ng2-translate/ng2-translate";
import {Forgotpassword} from "../forgotpassword/forgotpassword";
import {AppProvider} from '../../providers/app-provider';
import {Postad} from '../postad/postad';
import {Details} from '../details/details';
import {Inbox} from "../inbox/inbox";

import {Sellerdetails} from '../sellerdetails/sellerdetails';
// import {Push,PushToken} from '@ionic/cloud-angular';
import { Device } from '@ionic-native/device';

/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */


@Component({
	selector: 'page-login',
	templateUrl: 'login.html',
	providers: [LoginProvider],
})
export class Login {
	login: any;
	fbData: any;
	googleData: any;
	title;
	userdata;
	token;
	constructor(public navCtrl: NavController,
		public navParams: NavParams,
		public fb: Facebook,
		private googlePlus: GooglePlus,
		private loadingCtrl: LoadingController,
		private loginProvider: LoginProvider,
		private alertCtrl: AlertController,
		private translateService: TranslateService,
		private appprovider: AppProvider,
		public events: Events,
		private device: Device) {
		this.login = {};
		this.fbData = {};
		this.googleData = {};
		this.title = this.navParams.get('title');
		this.userdata = this.navParams.get('userdata');
	}

	ngOnInit() {

		if (this.title == 'Home' || this.title == 'Profile' || this.title == 'false' || this.title == 'postedad' || this.title == 'Inbox') {
			this.alertCtrl.create({
				title: 'Alert',
				subTitle: 'Please Login To Continue',
				buttons: [{
					text: 'ok',
					handler: () => {
						//this.navCtrl.push(Login)
					}
				}]

			}).present();
			// code...
		}
		console.log('ionViewDidLoad Login');
	}

	onRegisteration() {
		this.navCtrl.push(Registeration)
	}
	onLogin() {
		let partial = {
			email: this.login.email,
			password: this.login.password
		}
		let mandatory: string[] = [];
		if (!partial.email) {
			mandatory.push('* Email Field Empty')
		}
		if (!partial.password) {
			mandatory.push('* Password Field Empty')
		}
		if (mandatory.length > 0) {
			this.alertCtrl
				.create({
					title: this.translateService.instant('messages.mandatory'),
					message: mandatory.join('<br>'),
					buttons: ['ok']
				})
				.present()
			return
		}
		// alert(this.device.platform)
		if (this.device.platform == null || this.device.platform == 'null') {
			this.login.device_id = "12152";
			this.login.device_type = "Android";
			this.login.device_token = "sssfdfsahgccjgcg";
		} else {
			this.login.device_id = this.device.uuid;
			this.login.device_type = this.device.platform;
			this.login.device_token = "dsadsadsads";
		}

		let loading = this.loadingCtrl.create({
			content: 'Loading'
		});
		Observable.fromPromise(loading.present())
			.flatMap(data => this.loginProvider.Login(this.login))
			.subscribe(data =>
				loading.dismiss().then(() => {
					if (data.response == true) {
						this.login = data;
						localStorage['aut'] = 'login';
						this.appprovider.current.loginData = this.login;
						localStorage['loginflag'] = "email";
						this.appprovider.current.loginFlag = localStorage['loginflag']
						localStorage['user_id'] = this.login.user_info.id;
						this.events.publish('user:created');

						this.alertCtrl.create({
							title: this.translateService.instant('messages.loginsuccess'),
							buttons: [{
								text: 'OK',
								handler: data => {
									if (this.title == 'Home') {
										this.navCtrl.setRoot(Postad, {
											title: 'divclosed'
										})
									} else if (this.title == 'false') {
										this.navCtrl.setRoot(Postad, {
											title: 'divopen'
										})
									} else if (this.title == 'Profile') {
										this.navCtrl.setRoot(Details)
									} else if (this.title == 'postedad') {
										this.navCtrl.setRoot(Sellerdetails, {
											userdata: this.userdata
										})

									} else if (this.title == 'Inbox') {
										this.navCtrl.setRoot(Inbox);
									} else {
										this.navCtrl.setRoot(Postad)
									}
								}
							}]
						}).present();
						//this.navCtrl.setRoot(Category)
					}
					if (data.message == "wrong email or password") {
						this.alertCtrl.create({
							title: 'Login Unsuccessful',
							subTitle: 'Either Email Or Password Incorrect',
							buttons: [{
								text: 'OK'
							}]
						}).present();

					} else if (data.message == "account deactivated") {
						this.alertCtrl.create({
							title: 'Login Unsuccessful',
							subTitle: 'Your Account Is Deactivated <br> Please Contact Admin',
							buttons: [{
								text: 'OK'
							}]
						}).present();

					}
				}),
				error =>
				loading.dismiss().then(() => {
					this.alertCtrl.create({
						title: 'Alert',
						subTitle: 'Something Went Wrong. Please Try Again',
						buttons: [{
							text: 'ok'
						}]
					}).present();
				})
			);
	}

	onLoginWithFb() {
		this.fb.login(['public_profile', 'user_friends', 'email'])
			.then((res: FacebookLoginResponse) => {
				console.log('Logged into Facebook!', res)
				// alert( JSON.stringify (res));
				this.getdetails()
				this.events.publish('user:created');
			})
			.catch(e => console.log('Error logging into Facebook', e));

	}
	getdetails() {
		// alert('getdetails')
		this.fb.getLoginStatus()
			.then((response) => {
				if (response.status == "connected") {
					this.fb.api('/' + response.authResponse.userID + '?fields=id,name,gender,email,picture', [], )
						.then((result) => {
							// alert(JSON.stringify(result))
							this.fbData.name = result.name;
							this.fbData.email = result.email;
							this.fbData.image = result.picture.data.url;
							this.fbData.type = "facebook";
							this.fbData.device_id = this.device.uuid;
							this.fbData.device_type = this.device.platform;
							this.fbData.device_token = "dsadsadsads";
							this.fbLogin();
						})
						.catch(e => (e));
				}
			})
	}
	onLoginWithGoogle() {
		this.events.publish('user:created');
		this.googlePlus.login({})
			.then(res => {
				console.log(res)
				// alert( JSON.stringify (res))
				this.googleData.name = res.displayName;
				this.googleData.email = res.email;
				this.googleData.image = res.imageUrl;
				this.googleData.type = "google";
				this.googleData.device_id = this.device.uuid;
				this.googleData.device_type = this.device.platform;
				this.googleData.device_token = "dsadsadsads";
				this.googleLogin();
			})
			.catch(err =>
				(err));
	}

	fbLogin() {
		let loading = this.loadingCtrl.create({
			content: 'Loading'
		});
		Observable.fromPromise(loading.present())
			.flatMap(data => this.loginProvider.loginWithFb(this.fbData))
			.subscribe(data =>
				loading.dismiss().then(() => {
					this.fbData = data
					// alert(JSON.stringify(this.fbData));
					if (this.fbData.response == true) {
						localStorage['aut'] = 'login';
						localStorage['user_id'] = this.fbData.user_id;
						localStorage['loginflag'] = "social";
						this.appprovider.current.loginFlag = localStorage['loginflag'];
						this.alertCtrl.create({
							title: this.translateService.instant('messages.loginsuccess'),
							buttons: [{
								text: 'OK',
								handler: data => {
									if (this.title == 'Home') {
										this.navCtrl.setRoot(Postad, {
											title: 'divclosed'
										})
									} else if (this.title == 'false') {
										this.navCtrl.setRoot(Postad, {
											title: 'divopen'
										})
									} else if (this.title == 'Profile') {
										this.navCtrl.setRoot(Details)
									} else if (this.title == 'postedad') {
										this.navCtrl.setRoot(Sellerdetails, {
											userdata: this.userdata
										})
									} else if (this.title == 'Inbox') {
										this.navCtrl.setRoot(Inbox);
									} else {
										this.navCtrl.setRoot(Postad)
									}
								}
							}]
						}).present();
					}
				}),
				error =>
				loading.dismiss().then(() => {
					this.alertCtrl.create({
						title: 'Alert',
						subTitle: 'Error While Login With Facebook',
						buttons: [{
							text: 'ok'
						}]
					})

				})
			);
	}
	googleLogin() {
		let loading = this.loadingCtrl.create({
			content: 'Loading'
		});
		Observable.fromPromise(loading.present())
			.flatMap(data => this.loginProvider.loginWithGoogle(this.googleData))
			.subscribe(data =>
				loading.dismiss().then(() => {
					this.googleData = data
					//alert(JSON.stringify(this.googleData))
					if (this.googleData.response == true) {
						localStorage['aut'] = 'login';
						localStorage['user_id'] = this.googleData.user_id;
						localStorage['loginflag'] = "social";
						this.appprovider.current.loginFlag = localStorage['loginflag'];
						this.alertCtrl.create({
							title: this.translateService.instant('messages.loginsuccess'),
							buttons: [{
								text: 'OK',
								handler: data => {
									if (this.title == 'Home') {
										this.navCtrl.setRoot(Postad, {
											title: 'divclosed'
										})
									} else if (this.title == 'false') {
										this.navCtrl.setRoot(Postad, {
											title: 'divopen'
										})
									} else if (this.title == 'Profile') {
										this.navCtrl.setRoot(Details)
									} else if (this.title == 'postedad') {
										this.navCtrl.setRoot(Sellerdetails, {
											userdata: this.userdata
										})
									} else if (this.title == 'Inbox') {
										this.navCtrl.setRoot(Inbox);
									} else {
										this.navCtrl.setRoot(Postad)
									}
								}
							}]
						}).present();
					}
				}),
				error =>
				loading.dismiss().then(() => {
					this.alertCtrl.create({
						title: 'Alert',
						subTitle: 'Error While Login With Google+',
						buttons: [{
							text: 'ok'
						}]
					})

				})
			);
	}
	onForgotPassword() {
		this.navCtrl.push(Forgotpassword)
	}
}


