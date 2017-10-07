import { Component } from '@angular/core';
import {NavController,LoadingController,AlertController} from 'ionic-angular';
import {Http} from '@angular/http';
import {FormGroup,Validators,FormBuilder} from '@angular/forms';
import {Fpswd} from '../../providers/fpswd';
import {Observable} from 'rxjs/Rx';

/**
 * Generated class for the Forgotpassword page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */



@Component({
	selector: 'page-forgotpassword',
	templateUrl: 'forgotpassword.html',
	providers: [Fpswd]
})
export class Forgotpassword {
	http;
	data
	show: boolean = false;
	form3: FormGroup;
	form4: FormGroup;
	password;
	user_id;
	keyid;
	show2: boolean = true;
	username;
	login: any;
	confirm_password;
	old_password;
	usernam
	constructor(public navCtrl: NavController,
		http: Http,
		public alertCtrl: AlertController,
		public loadingCtrl: LoadingController,
		public formBuilder: FormBuilder,
		private faq: Fpswd) {
		this.http = http;
		this.data = {};
		let emailRegex = '^[a-zA-Z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$';
		this.login = {};
		this.form3 = formBuilder.group({
			email: ['', Validators.compose([Validators.pattern(emailRegex), Validators.required])],
			old_password: ['', Validators.compose([Validators.maxLength(30), Validators.pattern(''), Validators.required])],
			password: ['', Validators.compose([Validators.maxLength(25), Validators.minLength(6), Validators.pattern(''), Validators.required])],
			confirm_password: ['', Validators.compose([Validators.maxLength(25), Validators.minLength(6), Validators.pattern(''), Validators.required])],
		});
		this.form4 = formBuilder.group({
			username: ['', Validators.compose([Validators.maxLength(30), Validators.pattern(emailRegex), Validators.required])],
		});

	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad Forgotpassword');
	}
	forgotpswd_btn() {
		let partial = {
			email: this.form4.controls["username"].value,

		}
		let loading = this.loadingCtrl.create({
			content: 'Loading'
		});
		Observable.fromPromise(loading.present())
			.flatMap(data =>
				this.faq.func1(this.form4.controls["username"].value)
			)
			.subscribe(data =>
				loading.dismiss().then(() => {

					if (data.response == true) {
						this.username = data
						this.keyid = this.username.password;

						this.alertCtrl.create({
							title: 'Alert',
							subTitle: 'Please check your mail inbox for Key',
							buttons: [{
								text: 'OK',
								handler: data => {

								}
							}]
						}).present();
						this.show = true;
						this.show2 = false;

					} else if (data.response == false) {
						this.alertCtrl.create({
								title: 'Success!',
								subTitle: 'Email id not Register.',
								buttons: [{
									text: 'OK',
									handler: () => {
										this.navCtrl.pop()
									}
								}]
							})
							.present();
						// this.show = true;
						// this.show2 = false;
					}

				}),
				error =>
				loading.dismiss().then(() => {})
			);

	}
	changepswd() {

		let partiall = {
			new_passwd: this.password,
			confrimPaswrd: this.confirm_password,
			keyide: this.old_password,


		}
		let mandatory: string[] = []
		if (partiall.new_passwd != partiall.confrimPaswrd) {
			mandatory.push('Password & confirm password must be same')

		}
		if (partiall.keyide != this.keyid) {
			mandatory.push('Key Id is not valid')

		}
		if (mandatory.length > 0) {
			this.alertCtrl
				.create({
					title: 'Sorry',
					message: mandatory.join(', '),
					buttons: ['OK']
				})
				.present();
			return;
		}
		let partial = {
			email: this.usernam,
			password: this.password,

		}
		let loading = this.loadingCtrl.create({
			content: 'action.processing'
		});
		Observable.fromPromise(loading.present())
			.flatMap(data => this.faq.func2(partial))
			.subscribe(data =>
				loading.dismiss().then(() => {
					this.username = data
					if (this.username.response == true) {

						this.alertCtrl.create({
							title: 'Success',
							subTitle: 'Pasword Successfuly Changed..',
							buttons: [{
								text: 'OK',
								handler: data => {

								}
							}]
						}).present();
						this.show = true;
						this.show2 = false;

					} else if (this.username.response == false) {
						this.alertCtrl.create({
								title: 'Sorry!',
								subTitle: 'Try again.',
								buttons: ['OK']
							})
							.present();
						this.show = true;
						this.show2 = false;
					}

				}),


				error =>
				loading.dismiss().then(() => {})
			);
	}

}


