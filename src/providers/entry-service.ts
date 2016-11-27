// entry service
import { Injectable } from "@angular/core"
import { BehaviorSubject } from "rxjs/BehaviorSubject"

import { DbService } from './db-service'

@Injectable()
export class EntryService {

  _entries$: BehaviorSubject<any[]> = new BehaviorSubject( [] )
  entries: any
   // cache a copy of all entries for searching, because we will filter the entries collection
  entriesAll: any

  _language$: BehaviorSubject<string> = new BehaviorSubject("SOM")
  language: string

  constructor( public dbService: DbService ) {
  }

  // . . . . . . . . . . . . . . . . . . . . . . . .

  get language$() {
    return this._language$.asObservable()
  }

  setLanguage(language) {
    this.language = language
    this._language$.next( language )
    if ( this.entries ) this.sortEntries( language )
  }

  // . . . . . . . . . . . . . . . . . . . . . . . .

  get entries$() {
    return this._entries$.asObservable()
  }

  loadAll(letter) {
    console.log("EntryService | loadAll", letter)
    this.dbService.getFromPouch().then( (data) => {
      this.entries = data
      this.entriesAll = data
      if ( letter.toUpperCase() !== 'ALL' ) {
        this.entries = this.entries.filter( (el) => {
          if (this.language=='SOM') {
            return ( el.lx.toUpperCase().indexOf(letter.toUpperCase()) === 0 )
          } else {
            return ( el.de.toUpperCase().indexOf(letter.toUpperCase()) === 0 )
          }
        })
      }
      this._entries$.next(this.entries)
    }).catch( (err) => console.log(err) )
  }

  saveAll(entries) {
    // console.log("EntryService | saveAll")
    let doc = {"_id":"words", "entries":JSON.stringify(entries)}
    return new Promise((resolve, reject) => {
      this.dbService.insertOrUpdate( doc )
        .then(  (doc) => resolve(doc))
        .catch( (err) => reject(err))
    })
  }

  sortEntries( language ) {
    let orderBy = (language == 'SOM') ? 'lx' : 'de'
    console.log("sorting by", orderBy)
    this.entries.sort(function(a, b) {
        var textA = a[orderBy].toUpperCase();
        var textB = b[orderBy].toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
    this._entries$.next( this.entries )
  }

  getByID(id) {
    let entry = this.entries.filter( (el) => {
      return (el.id == id)
    })
    return entry[0]
  }

  getByIndex(index) {
    console.log("get by index", index)
    let entry = this.entries[index]
    console.log(entry)
    return entry
  }

  getIndexOfWord( word ) {
    return this.entries.findIndex(x => x==word)
  }

  search(term: string) {
    let entries = this.entriesAll
    if (term && term.trim() != '') {
      entries = this.entriesAll.filter( (el) => {
        return ((el.lx.toLowerCase().indexOf( term.trim().toLowerCase() ) > -1) || (el.de.toLowerCase().indexOf( term.trim().toLowerCase() ) > -1))
      })
    }
    this._entries$.next( entries )
  }

  searchClear() {
    this._entries$.next( this.entries )
  }


}

