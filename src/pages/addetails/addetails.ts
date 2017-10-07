import { Component } from '@angular/core';
import {  NavController, NavParams,AlertController,LoadingController ,} from 'ionic-angular';

import { Observable } from 'rxjs/Rx';
import { Categoryprovider } from '../../providers/categoryprovider';
import { AppProvider } from '../../providers/app-provider'
import { Postdetailprovider } from '../../providers/postdetailprovider'
import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';
import { File } from '@ionic-native/file';
import { Category } from '../category/category';
import { SocialSharing } from '@ionic-native/social-sharing';
/**
 * Generated class for the Addetails page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
 

declare var google;

@Component({
	selector: 'page-addetails',
	templateUrl: 'addetails.html',
	providers: [Categoryprovider, Postdetailprovider],
})
export class Addetails {
	category;
	imageUrl;
	id;
	post_details;
	acService
	autocompleteItems;
	placesService;
	thumbnail_url;

	constructor(public navCtrl: NavController,
		public navParams: NavParams,
		private loadingCtrl: LoadingController,
		private cat: Categoryprovider,
		private appprovider: AppProvider,
		private transfer: Transfer,
		private postdetails: Postdetailprovider,
		private alertctrl: AlertController,
		private file: File,
		private socialSharing: SocialSharing) {
		this.imageUrl = this.navParams.get("image");
		this.thumbnail_url = this.navParams.get("thumb");
		this.post_details = {};
		this.post_details.post_category = 'SELECT';
		this.post_details.negotiable = 'SELECT';
	}

	ionViewDidLoad() {

	}
	chooseItem(locationPlaceId, locationName) {
		this.post_details.location = locationName
		let map
		let mapEle = document.getElementById('map');
		map = new google.maps.Map(mapEle, {
			center: {
				lat: 25,
				lng: 35
			},
			zoom: 2,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			disableDefaultUI: true
		});
		google.maps.event.addListenerOnce(map, 'idle', () => {
			mapEle.classList.add('show-map');
			google.maps.event.trigger(mapEle, 'resize');
		});
		console.log(locationPlaceId, locationName)
		var request = {
			placeId: locationPlaceId
		};
		this.post_details.location = locationName;
		this.autocompleteItems = []
		this.placesService = new google.maps.places.PlacesService(map);
		this.placesService.getDetails(request, (place, status) => {
			if (status == google.maps.places.PlacesServiceStatus.OK) {
				console.log('page > getPlaceDetail > place > ', place);
				this.post_details.lat = place.geometry.location.lat()
				this.post_details.lng = place.geometry.location.lng()
				// alert(this.post_details.lat);
				// alert(this.post_details.lng)
				console.log(this.post_details.lat, this.post_details.long)
			} else {
				console.log('page > getPlaceDetail > status > ', status);
			}
		})
	}
	latlong() {}
	search() {
		//alert(this.post_details.location)
		let config
		let self = this;
		if (this.post_details.location == '') {
			this.autocompleteItems = [];
			return;
		}
		config = {
			types: ['geocode'],
			input: this.post_details.location,
		}
		this.acService.getPlacePredictions(config, function (predictions, status) {
			console.log('modal > getPlacePredictions > status > ', status);
			self.autocompleteItems = [];
			predictions.forEach(function (prediction) {
				self.autocompleteItems.push(prediction);
			});
		});
		//alert(JSON.stringify(this.autocompleteItems))
	}
	ngOnInit() {
		this.acService = new google.maps.places.AutocompleteService();
		this.autocompleteItems = [];
		console.log('ionViewDidLoad Addetails');
		let loading = this.loadingCtrl.create({
			content: 'Loading'
		});
		Observable.fromPromise(loading.present())
			.flatMap(data => this.cat.category(this.cat))
			.subscribe(data =>
				loading.dismiss().then(() => {
					this.category = data.data
				}),
				error =>
				loading.dismiss().then(() => {})
			);
		// alert( JSON.stringify(this.appprovider.current.loginData));
		// alert(localStorage['user_id']);
		// alert(this.imageUrl);
		// alert(JSON.stringify(this.imageUrl))
	}
	onPostAd() {
		let partial = {
			cat: this.post_details.post_category,
			title: this.post_details.ad_title,
			description: this.post_details.ad_description,
			cost: this.post_details.cost,
			negotiable: this.post_details.negotiable,
			location: this.post_details.location,
		}
		let mandatory: string[] = [];
		if (!partial.cat) {
			mandatory.push('* Category Field Empty')
		}
		if (partial.cat == 'SELECT') {
			mandatory.push('* Category Field Empty')
		}
		if (!partial.title) {
			mandatory.push('* Title Field Empty')
		}
		if (!partial.description) {
			mandatory.push('* Description Field Empty')
		}
		if (!partial.cost) {
			mandatory.push('* Either Cost Field Empty Or Invalid Input')
		}
		if (!partial.negotiable) {
			mandatory.push('* Negotiable Field Empty')
		}
		if (partial.negotiable == 'SELECT') {
			mandatory.push('* Negotiable Field Empty')
		}
		if (!partial.location) {
			mandatory.push('* Location Field Empty')
		}


		if (mandatory.length > 0) {
			this.alertctrl
				.create({
					title: 'Alert',
					message: mandatory.join('<br>'),
					buttons: ['ok']
				})
				.present()
			return
		}
		let loading = this.loadingCtrl.create({
			content: 'Loading'
		});
		Observable.fromPromise(loading.present())
		let options: FileUploadOptions = {
			fileKey: 'video',
			fileName: 'name.mp4',
			httpMethod: 'POST',
			chunkedMode: false,
			mimeType: "video/mpeg"


		}

		const fileTransfer: TransferObject = this.transfer.create();
		fileTransfer.upload(this.imageUrl, 'http://13.58.3.113/sbv/webservicepost_video', options, true)
			.then((data) => loading.dismiss().then(() => {

				this.id = JSON.parse(data.response)['post_id'];
				if (this.id) {
					this.uploadthumb()
					this.post_details.post_id = this.id;
					//alert(this.post_details)
					this.post_details.user_id = localStorage['user_id'];
					let loading = this.loadingCtrl.create({
						content: 'Loading'
					});

					Observable.fromPromise(loading.present())
						.flatMap(data => this.postdetails.postdetails(this.post_details))
						.subscribe(data =>
							loading.dismiss().then(() => {
								this.post_details = data
								if (this.post_details.response == true) {
									this.alertctrl.create({
										title: "Success",
										subTitle: "Your Ad has been successfully Posted",
										buttons: [{
											text: 'OK',
											handler: data => {
												this.navCtrl.setRoot(Category)
											}
										}]
									}).present()
								}
							}), error => loading.dismiss().then(() => {
	
								this.alertctrl.create({
									title: "Alert",
									subTitle: "Error While Posting Ad",
									buttons: [{
										text: 'ok'
									}]
								}).present()
							})
						);
				} else {
					// alert('video not uploaded')
				}
			}), (err) => {

				 // alert('err while uploading video');
				 //  alert(JSON.stringify(err));
				  // this.socialSharing.share(err,"err",null,null)
				loading.dismiss().then(() => {

					this.alertctrl.create({
						title: "Alert",
						subTitle: "please try again",
						buttons: [{
							text: "ok"
						}]
					}).present()
				})
			})
	}
	uploadthumb() {
		// alert('thumb')
		// alert(this.thumbnail_url)
		let options: FileUploadOptions = {
			fileKey: 'image',
			fileName: 'name.jpeg',
			chunkedMode: false,
		}
		const fileTransfer: TransferObject = this.transfer.create();
		fileTransfer.upload(this.thumbnail_url, 'http://13.58.3.113/sbv/webservicesavethumbnail/' + this.id, options)
			.then((data) => {
				// alert('thumberrrdata')
				// alert(JSON.stringify(data))
			}, (err) => {
				this.socialSharing.share(err,"errtumb",null,null)
				// alert('err while uploading thumbnail')
				// alert(JSON.stringify(err))
			})
	}
}


