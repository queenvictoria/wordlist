// entry service
import { Injectable } from "@angular/core"
import { BehaviorSubject } from "rxjs/BehaviorSubject"

import { DbService } from './db-service'


@Injectable()
export class EntryService {

  _entries$: BehaviorSubject<any[]> = new BehaviorSubject( [] )
  entries: any

  constructor( public dbService: DbService ) {}

  get entries$() {
    return this._entries$.asObservable()
  }

  // TODO: if there's an error 'missing' we could trigger get from firebase
  loadAll() {
    console.log("EntryService | loadAll")
    this.dbService.getFromPouch().then( (data) => {
      this.entries = data
      this._entries$.next(this.entries)
    }).catch( (err) => console.log(err) )
  }

  getByID(id) {
    this.loadAll()
    let entry = this.entries.filter( (el) => {
      return (el.id == id)
    })
    return entry[0]
  }


  search(term: string) {
    let entries = this.entries
    if (term && term.trim() != '') {
      entries = this.entries.filter( (el) => {
        return ((el.lx.toLowerCase().indexOf( term.trim().toLowerCase() ) > -1) ||
                (el.de.toLowerCase().indexOf( term.trim().toLowerCase() ) > -1))
      })
    }
    this._entries$.next( entries )
  }

  searchClear() {
    this._entries$.next( this.entries )
  }

}
