import { Component } from '@angular/core'
import { NavController } from 'ionic-angular'
import { DbService } from "../../providers/db-service"
import { EntryService } from "../../providers/entry-service"

import { Observable } from "rxjs/Observable";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  entries$: Observable<any[]>

  constructor(
    public dbService: DbService,
    public entryService: EntryService,
    public navCtrl: NavController
    ) {

    console.log("HomePage");

  }

  ngOnInit() {
    console.log("HomePage | ngOnInit");
    this.entries$ = this.entryService.entries$;
    console.log( this.entries$ );
    this.entryService.loadAll();
  }

  search (term) {
    this.entryService.search(term);
  }

  searchClear () {
    this.entryService.searchClear();
  }

  // buttons

  getFromPouch() {
    console.log("HomePage | click get from pouch")
    this.dbService.getFromPouch()
  }

  getFromFb() {
    console.log("HomePage | click get from firebase")
    this.dbService.getFromFb()
  }

  reloadUI() {
    this.entryService.loadAll();
  }

}
