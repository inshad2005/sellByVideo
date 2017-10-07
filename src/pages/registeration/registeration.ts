import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController,AlertController } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';
import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';
import { Register } from '../../providers/register';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Aboutus } from '../aboutus/aboutus';


/**
* Generated class for the Registeration page.
*
* See http://ionicframework.com/docs/components/#navigation for more info
* on Ionic pages and navigation.
*/



@Component({
	selector: 'page-registeration',
	templateUrl: 'registeration.html',
	providers: [Register],
})
export class Registeration {
	register: any;
	base64Image: any;
	termcondition


	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private registerProvider: Register,
		private loadingCtrl: LoadingController,
		public alrtCtrl: AlertController,
		private translateService: TranslateService,
		private camera: Camera,
		private transfer: Transfer) {
		this.register = {}
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad Registeration');
	}
	onLogin() {
		this.navCtrl.pop();
	}

	onAddImage() {
		const options: CameraOptions = {
			quality: 100,
			destinationType: this.camera.DestinationType.FILE_URI,
			encodingType: this.camera.EncodingType.JPEG,
			mediaType: this.camera.MediaType.PICTURE
		}
		this.camera.getPicture(options).then((imageData) => {

			this.base64Image = imageData;


		}, (err) => {

		});
	}
	onAddGallery() {
		const options: CameraOptions = {
			quality: 100,
			destinationType: this.camera.DestinationType.DATA_URL,
			encodingType: this.camera.EncodingType.JPEG,
			mediaType: this.camera.MediaType.PICTURE,
			sourceType: 0
		}
		this.camera.getPicture(options).then((imageData) => {

			let base64Images = 'data:image/jpeg;base64,' + imageData;
			this.base64Image = base64Images;

		}, (err) => {

		});
	}
	onRegister() {
		let partial = {
			name: this.register.name,
			email: this.register.email,
			city: this.register.city,
			contact: this.register.contact_no,
			password: this.register.password
		}
		let mandatory: string[] = [];
		if (!partial.name) {
			mandatory.push('Name')
		}
		if (!partial.email) {
			mandatory.push('Email')
		}
		if (!partial.city) {
			mandatory.push('City')
		}
		if (!partial.contact) {
			mandatory.push('Contact Number')
		}
		if (!partial.password) {
			mandatory.push('Password')
		}
		if (mandatory.length > 0) {
			this.alrtCtrl
				.create({
					title: "mandatory",
					message: mandatory.join(','),
					buttons: ['ok']
				})
				.present()
			return
		}

		this.register.type = "normal";
		let loading = this.loadingCtrl.create({
			content: 'Loading'
		});
		Observable.fromPromise(loading.present())
			.flatMap(data => this.registerProvider.register(this.register))
			.subscribe(data =>
				loading.dismiss().then(() => {

					this.register = data

					if (this.register.response == true && this.base64Image) {


						let loading = this.loadingCtrl.create({
							content: 'Loading'
						});
						Observable.fromPromise(loading.present())
						let options: FileUploadOptions = {
							fileKey: 'image',
							fileName: 'name.jpeg',
							chunkedMode: false,
						}
						const fileTransfer: TransferObject = this.transfer.create();
						fileTransfer.upload(this.base64Image, 'http://13.58.3.113/sbv/webserviceprofile_pic/' + this.register.user_id, options)
							.then((data) => {
								loading.dismiss().then(() => {
									this.alrtCtrl.create({
										title: this.translateService.instant('messages.register'),
										buttons: [{
											text: 'OK',
											handler: () => {
												this.navCtrl.pop();

											}
										}]

									}).present();

								})

							}, (err) => {
								// alert(JSON.stringify(err));
								loading.dismiss().then(() => {
									this.alrtCtrl.create({
										title: "Alert",
										subTitle: "Something Went Wrong",
										buttons: [{
											text: 'OK'
										}]
									}).present();
								})

							})
					} else if (this.register.response == true) {
						loading.dismiss().then(() => {
							this.alrtCtrl.create({
								title: this.translateService.instant('messages.register'),
								buttons: [{
									text: 'OK',
									handler: () => {
										this.navCtrl.pop();

									}
								}]
							}).present();
						})
					} else if (this.register.response == false) {
						loading.dismiss().then(() => {
							this.alrtCtrl.create({
								title: "Already Registered",
								subTitle: "This Account Is Already Registered With Us",
								buttons: [{
									text: 'ok',
									handler: () => {
										this.navCtrl.pop();
									}
								}]
							}).present();
						})
					} else {
						this.navCtrl.pop();
					}
				}),
				error =>
				loading.dismiss().then(() => {})
			);
	}
	term(a){
    this.termcondition=a;
    // alert(a)

  }
  onTermCondition(){
  	this.navCtrl.push(Aboutus,{a:"term"})
  }

}





