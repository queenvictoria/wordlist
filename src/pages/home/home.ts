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
  language: string
  showAlphabet: boolean
  uniqueLettersSOM: string[]
  uniqueLettersENG: string[]

  constructor(
    public dbService: DbService,
    public entryService: EntryService,
    public navCtrl: NavController
    ) {

    // console.log("HomePage")

    // console.log("HomePage | subscribe to language$")
    this.entryService.language$.subscribe( (language) => {
          this.language = language
          console.log("HomePage | has this language", language)
        })
    this.showAlphabet = false
  }

  ionViewWillEnter() {
    this.syncStatus = 'ready'
    setTimeout(() => {
      this.syncData()
    }, 0); // set this to smooth the UX
  }

  syncData() {
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
      .then( (entries) => {
        console.log("HomePage | got from pouch")
        this.syncStatus = 'local'
        this.dbService.getFromFb().then((entries) => {
        this.entryService.saveAll(entries)
        })
        setTimeout(() => {
          this.whatToDoNext(entries)
        }, 0) // set this to smooth the UX
      })
      .catch( (err) => {
        console.log("HomePage | no pouch, get from fb")
        this.syncStatus = 'sync'
        // start firebase
        this.dbService.getFromFb().then( (entries) => {
          this.syncStatus = 'synced'
          console.log("HomePage | got from fb", entries)
          // save to pouch
          this.entryService.saveAll(entries).then((entries) => {
            this.syncStatus = 'saved'
            console.log("entries?", entries)
            this.dbService.getFromPouch().then((entries) => this.whatToDoNext(entries))
          })
        })
      })
  }

  whatToDoNext(entries) {
    // could go to the wordlist
    // this.navCtrl.setRoot(WordlistPage)
    // or we could show alphabet buttons
    this.showAlphabet = true
    this.getAlphabetSOM(entries)
    this.getAlphabetENG(entries)
  }


  getAlphabetSOM(entries) {
    let letters = []
    letters = entries.map((e) => {
      let i = e.lx.substring(0, 1).toUpperCase()
      return i
    })
    this.uniqueLettersSOM = this.uniques(letters).sort()
  }



  getAlphabetENG(entries) {
    let letters = []
    letters = entries.map((e) => {
      let i = e.de.substring(0, 1).toUpperCase()
      return i
    })
    this.uniqueLettersENG = this.uniques(letters).sort()
  }

  uniques(arr) {
      let a = []
      for (let i=0, l=arr.length; i<l; i++)
          if (a.indexOf(arr[i]) === -1 && arr[i] !== '')
              a.push(arr[i])
      return a
  }


  // buttons

  getFromPouch() {
    this.dbService.getFromPouch()
      .then( (res) => console.log("got from pouch", res) )
      .catch( (err) => { console.log("getting from pouch failed", err) })
  }

  getFromFb() {
    this.dbService.getFromFb()
      .then( (res) => console.log("got from firebase", res) )
      .catch( (err) => { console.log("getting from firebase failed", err) })
  }

  goto(page) {
    if (page == "wordlist") this.navCtrl.push(WordlistPage)
  }

  gotoWordlist(letter) {
    this.navCtrl.push(WordlistPage, {"letter":letter})
  }



}

