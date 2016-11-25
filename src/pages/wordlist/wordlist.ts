import { Component } from '@angular/core'
import { NavController } from 'ionic-angular'
import { DbService } from "../../providers/db-service"
import { EntryService } from "../../providers/entry-service"

import { Observable } from "rxjs/Observable";

@Component({
  selector: 'page-wordlist',
  templateUrl: 'wordlist.html'
})
export class WordlistPage {

  entries$: Observable<any[]>
  lang: string
  langOrder: string
  somaliButtonColour: string = "primary"
  englishButtonColour: string = "default"

  constructor(
    public dbService: DbService,
    public entryService: EntryService,
    public navCtrl: NavController
    ) {

    console.log("WordlistPage")

    this.lang = "ENG"

  }

  ngOnInit() {
    console.log("WordlistPage | ngOnInit");
    this.entries$ = this.entryService.entries$
    this.entryService.loadAll()
  }

  search (term) {
    this.entryService.search(term)
  }

  searchClear () {
    this.entryService.searchClear();
  }

  // buttons

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

  changeLanguage(lang) {

    this.lang = lang

    // reorder the entries array by sorting on different keys
    if (lang == 'SOM') {
      this.entryService.sortEntries('lx')
      this.somaliButtonColour = "primary"
      this.englishButtonColour = "default"
    } else {
      this.entryService.sortEntries('de')
      this.somaliButtonColour = "default"
      this.englishButtonColour = "primary"
    }
  }
}

