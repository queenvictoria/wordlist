import { Component } from '@angular/core'
import { NavController } from 'ionic-angular'
import { DbService } from "../../providers/db-service"


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  words: any

  constructor(
    public dbService: DbService,
    public navCtrl: NavController
    ) {

    console.log("home.ts");

  }

  getFromPouch() {
    console.log("home | get from pouch")
    this.dbService.getFromPouch().then( (data) => {
      this.words = data
    })
  }

  getFromFb() {
    console.log("home | get from firebase")
    this.dbService.getFromFb()
  }

}
