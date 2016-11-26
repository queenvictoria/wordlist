import { Component } from '@angular/core'
import { NavController } from 'ionic-angular'
import { DbService } from "../../providers/db-service"
import { EntryService } from "../../providers/entry-service"
import { Observable } from "rxjs/Observable";

import { WordPage } from "../word/word"

@Component({
  selector: 'page-wordlist',
  templateUrl: 'wordlist.html'
})
export class WordlistPage {

  entries$: Observable<any[]>
  language: string
  somaliButtonColour: string
  englishButtonColour: string

  constructor(
    public dbService: DbService,
    public entryService: EntryService,
    public navCtrl: NavController
    ) {

    console.log("WordlistPage")

    console.log("WordlistPage | subscribe to language$")
    this.entryService.language$.subscribe( (language) => {
          this.language = language
          console.log("have this.language", this.language)
          this.doButtonColours(language)
        })

    console.log("WordlistPage | subscribe to entries$")
    this.entries$ = this.entryService.entries$
    this.entryService.entries$.subscribe( (entries) => {
      console.log("got entries", entries)
    } )
    this.entryService.loadAll()

  }

  search (term) {
    this.entryService.search(term)
  }

  searchClear () {
    this.entryService.searchClear();
  }

  // buttons

  gotoWord(word) {
    console.log("WordlistPage | gotoWord word", word)
    let index = this.entryService.getIndexOfWord(word)
    this.navCtrl.push(WordPage, {"index": index})
  }

  getFromPouch() {
    console.log("HomePage | click get from pouch")
    this.dbService.getFromPouch()
      .then( (res) => console.log("got from pouch", res) )
      .catch( (err) => { console.log("getting from pouch failed", err) })
  }

  getFromFb() {
    console.log("HomePage | click get from firebase")
    this.dbService.getFromFb()
      .then( (res) => console.log("got from firebase", res) )
      .catch( (err) => { console.log("getting from firebase failed", err) })
  }

  reloadUI() {
    this.entryService.loadAll();
  }

  setLanguage(language) {
    this.entryService.setLanguage(language)
    console.log("setLanguage", language)
  }
  doButtonColours(language) {
    if (language == 'SOM') {
      this.somaliButtonColour = "primary"
      this.englishButtonColour = "default"
    } else {
      this.somaliButtonColour = "default"
      this.englishButtonColour = "primary"
    }
  }
}

