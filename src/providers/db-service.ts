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
      this.pdb.get("words")
        .then(  (doc) => resolve(JSON.parse(doc.entries)))
        .catch( (err) => reject(err) )
    })
  }

  getFromFb() {
    console.log( "DbService | getFromFb" )
    return new Promise((resolve, reject) => {
      firebase.database().ref('/entriesTest/')
          .once('value')
          .then( (snapshot) => {
            let doc = {"_id":"words", "entries":JSON.stringify(snapshot.val())}
            this.insertOrUpdate( doc ).then( (res) => {
                          console.log("now", res)
                          resolve( "mememe" )
                          })


          })
          .catch( (err) => reject(err) )
    })
  }

  insertOrUpdate(doc) {
    return new Promise((resolve, reject) => {
      this.pdb.get(doc._id)
      .then( (_doc) => {
        console.log("in new promise then")
          doc._rev = _doc._rev
          resolve(this.pdb.put(doc))
      }).catch( (err) => {
          console.log(err)
          resolve(this.pdb.put(doc))
      })
    })
  }

}
