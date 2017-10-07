import { Component,ViewChild } from '@angular/core';
import {  NavController, NavParams,PopoverController,ViewController} from 'ionic-angular';



@Component({
  selector: 'page-popup',
  templateUrl: 'popup.html',
})
export class Popup {
@ViewChild('myvideo') myVideo: any;
passVideo:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private pop:PopoverController, private view:ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Popup');
  }
onTakeVideo()   {
	this.view.dismiss({information:'buttonClick1'});
 
}
selectvideo(){
   this.view.dismiss({information:'buttonClick2'});
  
}
//   onTakeVideo()   {
//     let video = this.myVideo.nativeElement;
//  	let options: CaptureVideoOptions = { limit: 1,duration:30 };
//       this.mediaCapture.captureVideo(options).then( (data: MediaFile[]) => {
//      video.src = data[0].fullPath;
//      alert(video.src);
//      alert(JSON.stringify(video.src));
//      // this.passVideo=data[0].fullPath;
//       // video.play();

//   });
// this.navCtrl.push(Postadvideo,{})
//   }

// selectvideo() {
//   let video = this.myVideo.nativeElement;
//    const options: CameraOptions = {
//   quality: 100,
//   sourceType: 2,
//   mediaType: 1
// }
// this.camera.getPicture(options).then((imageData) => {
//    video.src = imageData;
//       video.play();

// });
    
  
//   }     
   
}
