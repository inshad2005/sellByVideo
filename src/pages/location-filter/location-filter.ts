import { Component } from '@angular/core';
import {  NavController, NavParams,LoadingController,AlertController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { AppProvider } from '../../providers/app-provider';
import { NearByAds } from '../near-by-ads/near-by-ads'


/**
 * Generated class for the LocationFilter page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */


declare var google;
@Component({
  selector: 'page-location-filter',
  templateUrl: 'location-filter.html',
  // providers:[AppProvider]
  providers: [Geolocation]

})
export class LocationFilter {

  currentLat;
  currentLng;
  locationData;
  zipCode;
  distance = 25;
  acService
  autocompleteItems;
  placesService;
  CITY
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private geolocation: Geolocation,
    private appProvider: AppProvider,
    private loading: LoadingController,
    private alertCtrl: AlertController,
  ) {
    this.locationData = {};

    // alert(this.zipCode)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocationFilter');
    // alert(this.appProvider.current.zipcode)
  }
  chooseItem(locationPlaceId, locationName) {
    this.CITY = locationName
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
    this.CITY = locationName;
    this.autocompleteItems = []
    this.placesService = new google.maps.places.PlacesService(map);
    this.placesService.getDetails(request, (place, status) => {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        console.log('page > getPlaceDetail > place > ', place);
        this.currentLat = place.geometry.location.lat()
        this.currentLng = place.geometry.location.lng()
        // alert(this.currentLat);
        // alert(this.currentLng)      
      } else {
        console.log('page > getPlaceDetail > status > ', status);
      }
    })
  }

  search() {
    //alert(this.post_details.location)
    let config
    let self = this;
    if (this.CITY == '') {
      this.autocompleteItems = [];
      return;
    }
    config = {
      types: ['geocode'],
      input: this.CITY,
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
  }


  onGetCurrentLocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.currentLat = resp.coords.latitude;
      this.currentLng = resp.coords.longitude;
      // alert(this.currentLat)
      // alert(this.currentLng)
    }).catch((error) => {
      // alert(error)
      console.log('Error getting location', error);
    });

    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
    });
  }
  getNearByAds() {
    this.navCtrl.push(NearByAds, {
      latitude: this.currentLat,
      longitude: this.currentLng,
      miles: this.distance
    })
  }


}


