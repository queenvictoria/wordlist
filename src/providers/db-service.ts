// Somali db service
import { Injectable } from "@angular/core"
import { AngularFire } from "angularfire2"

import PouchDB from 'pouchdb'


@Injectable()
export class DbService {

  fdb: any // firebase
  pdb: any // pouchdb

  constructor(
    public af: AngularFire
    ) {
    console.log("DbService");
    // create or open the db
    this.pdb = new PouchDB('entries');
  }

  getFromPouch() {
    console.log("DbService | getFromPouch")
    return new Promise((resolve, reject) => {

      this.pdb.get('words').then( (doc) => {

        console.log(doc)

        resolve(JSON.parse(doc.entries))
      }).catch( (err) => {
        reject(err)
      })

    })
  }



  getFromFb() {
    console.log( "DbService | getFromFb" )

    // get the words
    this.fdb = this.af.database.list('/entriesTest')
    // subscribe and then we can deal with the results
    this.fdb.subscribe( (data) => {

      if (data.length > 0) {
        console.log("got entries from frb")

        // stringify the data from firebase and store as a single item
        // quicker to read it back in and parse,
        // than to store and retrieve tens of thousands of entries
        let entries =  JSON.stringify(data)
        this.createOrUpdateThenShowAll ( entries )

      }
    })
  }



 createOrUpdateThenShowAll ( doc ) {

    this.pdb.get ( doc._id )
        .then ( (docOriginal) => {
            console.log('updating');
            doc._rev = docOriginal._rev;
            return this.pdb.put( doc );
            })

        .catch( (error) => {
            console.log('adding');

            return this.pdb.post( {"_id":"words", "entries":doc} );
            })

        .then( (info) => {
            console.log("id of record: " + info.id);
    })
}


}
