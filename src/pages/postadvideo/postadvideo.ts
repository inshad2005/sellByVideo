import { Component,ViewChild, } from '@angular/core';
import {  NavController, NavParams,LoadingController,AlertController} from 'ionic-angular';
import { MediaCapture, MediaFile,CaptureVideoOptions,CaptureError } from '@ionic-native/media-capture';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Addetails } from '../addetails/addetails';
import { VideoEditor } from '@ionic-native/video-editor';
import { Transfer } from '@ionic-native/transfer';




@Component({
  selector: 'page-postadvideo',
  templateUrl: 'postadvideo.html',
  providers: [VideoEditor]

})
export class Postadvideo {
  @ViewChild('myvideo') myVideo: any;

  getVideo: any;
  take;
  imageUrl: any;
  video;
  thumbnail_url;
  videoDuration;
  intervalCheck;
  nextButton:boolean=false;


  constructor(public navCtrl: NavController, public navParams: NavParams, private mediaCapture: MediaCapture,
    private camera: Camera, private loadingCtrl: LoadingController, private alert: AlertController, private videoEditor: VideoEditor,
    private transfer: Transfer) {
    // this.getVideo=this.navParams.get('passVideo');
    this.take = this.navParams.get('info');
  }

  ngOnInit() {
    if (this.take == 'onTake') {
      this.onTakeVideo()
    } else if (this.take == 'select') {
      // code...
      this.selectvideo()
    }
  }
  onTakeVideo() {
    this.video = this.myVideo.nativeElement;
    let options: CaptureVideoOptions = {
      limit: 1,
      duration: 30,
    };
    this.mediaCapture.captureVideo(options).then((data: MediaFile[]) => {
        this.video.src = data[0].fullPath;
        this.imageUrl = data[0].fullPath;
        this.video.play();
        this.uploadthumb();
      },
      (err: CaptureError) => {
        this.alert.create({
          title: "No Video",
          subTitle: "Please Capture video to Proceed",
          buttons: [{
            text: "ok",
            handler: () => {
              this.navCtrl.pop();
            }
          }]
        }).present();
      }
    );
  }
  selectvideo() {
    this.video = this.myVideo.nativeElement;
    const options: CameraOptions = {
      quality: 100,
      sourceType: 2,
      mediaType: 1
    }
    this.camera.getPicture(options).then((imageData) => {
        this.video.src = imageData;
        this.imageUrl = imageData;
        this.video.play();
        // this.uploadthumb();
        this.setVideoInterval()

      },
      (err) => {
        this.alert.create({
          title: "No Video!",
          subTitle: "Please Select video to Proceed",
          buttons: [{
            text: "ok",
            handler: () => {
              this.navCtrl.pop();
            }
          }]
        }).present();

      }
    );
  }
   setVideoInterval(){
     this.intervalCheck=setInterval(()=>{this.getVideoLength()},1000)
  }
  getVideoLength(){
   let a=this.video.duration;
       if(a!=NaN || a!='NaN'){        
          if (a<=30) {
            this.uploadthumb()
          }
          else if (a>30) {
          this.errorMsg()
          // this.trimVideo();
       }
  }
}

    // trimVideo(){
    //   this.videoEditor.trim({
    //     fileUri:this.imageUrl,
    //     trimStart:5,
    //     trimEnd:35,
    //     outputFileName:'video'
    //   }
    // )
    // .then((fileUri: string) =>{alert(JSON.stringify(fileUri))
    //   this.imageUrl=fileUri})
    // .catch((error: any) => alert(error));
    // }
  errorMsg(){
    clearInterval(this.intervalCheck)
    this.alert.create({
            title:'Alert',
            subTitle:'You Are Trying To Upload Video Greater Than 30 Seconds',
            buttons:[{
              text:'ok',
              handler:()=>{
                this.navCtrl.pop();
              }
            }]
          }).present();
          }
  
  uploadthumb() {
    clearInterval(this.intervalCheck)
    this.videoEditor.createThumbnail({
        fileUri: this.imageUrl,
        outputFileName: 'thum',
        atTime: 3,
        quality: 75
      })
      .then((data: string) => {
        this.thumbnail_url = data;
        this.nextButton=true
        // alert(JSON.stringify(data)) 
        // alert(JSON.stringify(this.thumbnail_url)) 
        // this.uploadthumb()
        console.log('video transcode success', data)
      })
      .catch((error: any) => {
        // alert(JSON.stringify(error)) 
        console.log('video transcode error', error)
        this.alert.create({
          title: "No Video!",
          subTitle: "Please Select video to Proceed",
          buttons: [{
            text: "ok",
            handler: () => {
              this.navCtrl.pop();
            }
          }]
        }).present();


      });

    // this.video.pause();
    // this.navCtrl.push(Addetails,{image:this.imageUrl,thumb:this.thumbnail_url}) ;
  }
  onCancel() {
    this.navCtrl.pop();
  }
  onNext() {
       this.video.pause();
       this.navCtrl.push(Addetails, {
          image: this.imageUrl,
          thumb: this.thumbnail_url
        });


    //-----------------------------------------------------------only mp4 code --------------------------------------------
    // let a=this.imageUrl.split('.');
 
    // let b = a.length;
    //   if (a[b-1] == 'mp4' || a[b-1] == 'MP4') {
    //        this.navCtrl.push(Addetails, {
    //       image: this.imageUrl,
    //       thumb: this.thumbnail_url
    //     });

    //     }
    //     else {
    //       this.alert.create({
    //         title:'Alert',
    //         subTitle:'Only .mp4 Format is Acceptable',
    //         buttons:[{
    //           text:'ok',
    //           handler :() =>{
    //             this.navCtrl.pop();
    //           }
    //         }]

    //       }).present();
    //     }  
    //-----------------------------------------------------only mp4 ends-------------------------------------------------------
    
    // alert('thumb')
    // alert(this.thumbnail_url)
    // let options: FileUploadOptions = {
    //                                      fileKey: 'image',
    //                                      fileName: 'name.jpeg',
    //                                      chunkedMode: false,
    //                                   }
    //                 const fileTransfer: TransferObject = this.transfer.create();
    //                  fileTransfer.upload(this.thumbnail_url, 'http://13.58.3.113/sbv/webserviceprofile_pic/5', options)
    //                      .then((data) => {

    //                        alert('thumberrrdata')
    //                        alert(JSON.stringify(data))

    //                        }, (err) => {

    //                        alert('err')
    //                        alert(JSON.stringify(err))

    //                        })

  }
}


