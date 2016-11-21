import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the Word page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-word',
  templateUrl: 'word.html'
})
export class WordPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello WordPage Page');
  }

}
