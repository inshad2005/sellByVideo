import { Component } from '@angular/core';
import {  NavController, NavParams,LoadingController } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';
import { RecentPostsProvider } from "../../providers/recent-posts-provider";
import { Postedad } from "../postedad/postedad";

/**
 * Generated class for the RecentPosts page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */


@Component({
	selector: 'page-recent-posts',
	templateUrl: 'recent-posts.html',
	providers: [RecentPostsProvider]
})
export class RecentPosts {
	posts;
	ads;
	noPost
	constructor(public navCtrl: NavController, public navParams: NavParams, private loadingCtrl: LoadingController, private recentprovider: RecentPostsProvider) {}

	ionViewDidLoad() {
		console.log('ionViewDidLoad RecentPosts');
		let loading = this.loadingCtrl.create({
			content: 'Loading'
		});
		Observable.fromPromise(loading.present())
			.flatMap(data => this.recentprovider.recentPost(this.posts))
			.subscribe(data =>
				loading.dismiss().then(() => {
					this.posts = data.data;
					this.ads = this.posts;
					if (this.ads.length == 0) {
						this.noPost='true'
					}
				}),
				error =>
				loading.dismiss().then(() => {})
			);

	}
	onclickAd(p) {
		this.navCtrl.push(Postedad, {
			pdata: p
		});
	}
}


