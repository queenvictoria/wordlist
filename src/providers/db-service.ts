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

    console.log("db service");

    // create or open the db
    this.pdb = new PouchDB('entries');
  }

  getFromPouch() {
    console.log("db service | getFromPouch")
    return new Promise((resolve) => {
      this.pdb.get( 'words' ).then( (result) => {
        resolve(JSON.parse(result.entries))
      })
    })
  }

  getFromFb() {
    console.log( "get from firebase" )
    let t0 = performance.now()
    // get the words
    this.fdb = this.af.database.list('/')

    // subscribe and then we can deal with the results
    this.fdb.subscribe( (data) => {

      console.log( data )

      if (data.length > 0) {

        //  Two approaches:

        //  1. save each entry individually

        // pouch has trouble storing the data directly from firebase,
        // maybe something to do with the $key key?
        // so copy the objects without that

        // let dataCopy = data.map( (e) => {
        //   return {
        //       "_id": e.$key,
        //       "initial": e.initial,
        //       "word": e.word
        //   }
        // })

        //  2. stringify the data from firebase and store that
        let entries = JSON.stringify(data)

        this.pdb.put( {"_id": "words", "entries": entries} ).then( (result) => {
          let t1 = performance.now()
          console.log("allDocs took " + (t1 - t0) + " milliseconds")
          console.log(result)
        }).catch( (err) => console.log(err))

      }
    })

  }




  add(something) {
    return this.pdb.post(something)
  }

}
