import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the Letter page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-letter',
  templateUrl: 'letter.html'
})
export class LetterPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello LetterPage Page');
  }

}
