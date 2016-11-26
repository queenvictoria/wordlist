// entry service
import { Injectable } from "@angular/core"
import { BehaviorSubject } from "rxjs/BehaviorSubject"

import { DbService } from './db-service'

@Injectable()
export class EntryService {

  _entries$: BehaviorSubject<any[]> = new BehaviorSubject( [] )
  entries: any

  _language$: BehaviorSubject<string> = new BehaviorSubject("SOM")

  constructor( public dbService: DbService ) {
  }

  get language$() {
    return this._language$.asObservable()
  }

  setLanguage(language) {
    this._language$.next( language )
    this.sortEntries( language )
  }

  get entries$() {
    return this._entries$.asObservable()
  }

  loadAll() {
    console.log("EntryService | loadAll")
    this.dbService.getFromPouch().then( (data) => {
      this.entries = data
      this._entries$.next(this.entries)
    }).catch( (err) => console.log(err) )
  }

  saveAll(entries) {
    console.log("EntryService | saveAll")
    let doc = {"_id":"words", "entries":JSON.stringify(entries)}
    return new Promise((resolve, reject) => {
      this.dbService.insertOrUpdate( doc )
        .then(  (doc) => {console.log("saveAll will resolve"); resolve(doc)})
        .catch( (err) => {console.log("saveAll will reject");  reject(err)})
    })
  }

  getByID(id) {
    this.loadAll()
    let entry = this.entries.filter( (el) => {
      return (el.id == id)
    })
    return entry[0]
  }

  getIndexOfWord( word ) {
    return this.entries.findIndex(x => x==word)
  }

  search(term: string) {
    let entries = this.entries
    if (term && term.trim() != '') {
      entries = this.entries.filter( (el) => {
        return ((el.lx.toLowerCase().indexOf( term.trim().toLowerCase() ) > -1) || (el.de.toLowerCase().indexOf( term.trim().toLowerCase() ) > -1))
      })
    }
    this._entries$.next( entries )
  }

  searchClear() {
    this._entries$.next( this.entries )
  }

  sortEntries( language ) {
    let orderBy = (language == 'SOM') ? 'lx' : 'de'
    this.entries.sort(function(a, b) {
        var textA = a[orderBy].toUpperCase();
        var textB = b[orderBy].toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
    this._entries$.next( this.entries )
  }

}

