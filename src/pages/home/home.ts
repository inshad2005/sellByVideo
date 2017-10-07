import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Registeration } from '../registeration/registeration';
import {Login} from '../login/login' ;



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  constructor(public navCtrl: NavController) {
  }
 onRegister()
  {
  	this.navCtrl.push(Registeration);
  }

  onLogin(){
  	this.navCtrl.push(Login);
  }

}
