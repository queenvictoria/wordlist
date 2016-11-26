import { Component } from '@angular/core'
import { NavController } from 'ionic-angular'
import { DbService } from "../../providers/db-service"
import { EntryService } from "../../providers/entry-service"
import { WordlistPage } from "../wordlist/wordlist"

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  syncStatus: string

  constructor(
    public dbService: DbService,
    public entryService: EntryService,
    public navCtrl: NavController
    ) {

    console.log("HomePage")

  }

  ionViewWillEnter() {
    this.syncStatus = 'ready'
    setTimeout(() => {
      this.syncData()
    }, 500); // set this to smooth the UX
  }

  syncData() {
    console.log("HomePage | starting syncData")

    /*
    first, get from pouch
    if we have content,
      start an update from firebase and goto the wordlist

    no content in pouch then
      start an update from firebase
      get from pouch
      then go to wordlist
    */

    this.dbService.getFromPouch()
      .then( () => {
        this.syncStatus = 'local'
        console.log("HomePage | got from pouch OK")
        console.log("HomePage | now update from fb")
        console.log("HomePage | and goto the wordlist")
        // start firebase
        this.dbService.getFromFb().then((entries) => {
          console.log("HomePage | got from fb OK")
          console.log("HomePage | now save all")
          // save to pouch
          this.entryService.saveAll(entries)
        })

        // move to wordlist automatically if this is the first time through
        setTimeout(() => {
          console.log("HomePage | now goto wordlist")
          this.navCtrl.setRoot(WordlistPage)
        }, 500) // set this to smooth the UX

      })
      .catch( (err) => {
        this.syncStatus = 'sync'
        console.log("getting from pouch failed", err)
        console.log("get from firebase")
        console.log("save to pouch")
        console.log("go to the wordlist")
        // start firebase
        this.dbService.getFromFb().then( (entries) => {
        // save to pouch
        this.entryService.saveAll(entries).then(() => {
          // move to wordlist
          this.navCtrl.setRoot(WordlistPage)
          })
        })
      })


  }

  // buttons

  getFromPouch() {
    // console.log("HomePage | click get from pouch")
    this.dbService.getFromPouch()
      .then( (res) => console.log("got from pouch", res) )
      .catch( (err) => { console.log("getting from pouch failed", err) })
  }

  getFromFb() {
    // console.log("HomePage | click get from firebase")
    this.dbService.getFromFb()
      .then( (res) => console.log("got from firebase", res) )
      .catch( (err) => { console.log("getting from firebase failed", err) })
  }

  reloadUI() {
    this.entryService.loadAll()
  }


  goto(page) {
    if (page == "wordlist") this.navCtrl.push(WordlistPage)
  }
}

