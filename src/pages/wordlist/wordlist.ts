import { Component } from '@angular/core'
import { NavController, NavParams } from 'ionic-angular'
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
  letter: string
  language: string

  constructor(
    public dbService: DbService,
    public entryService: EntryService,
    public navCtrl: NavController,
    public navParams: NavParams
    ) {

    // console.log("WordlistPage")
    this.letter = navParams.get("letter")
    console.log("using letter", this.letter)

    // console.log("WordlistPage | subscribe to language$")
    this.entryService.language$.subscribe( (language) => {
          this.language = language
          console.log("using language", language)
        })

    // console.log("WordlistPage | subscribe to entries$")
    this.entries$ = this.entryService.entries$
    this.entryService.entries$.subscribe( (entries) => {
      console.log("WordlistPage | got entries", entries)
    } )
    this.entryService.loadAll(this.letter)

  }

  search (term) {
    this.entryService.search(term)
  }

  searchClear () {
    this.entryService.searchClear();
  }

  // buttons

  gotoWord(word) {
    // console.log("WordlistPage | gotoWord word", word)
    let index = this.entryService.getIndexOfWord(word)
    this.navCtrl.push(WordPage, {"index": index})
  }

}

