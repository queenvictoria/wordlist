// Somali db service
import { Injectable } from "@angular/core"
import { AngularFire } from "angularfire2"

import PouchDB from 'pouchdb'


@Injectable()
export class DbService {

  fdb: any // firebase
  pdb: any // pouchdb
  entriesKey: string = "/entriesTest/" // or "/entries/"

  constructor(
    public af: AngularFire
    ) {

    // console.log("DbService");

    // create or open the db
    this.pdb = new PouchDB('entries');
  }

  getFromPouch() {
    // console.log("DbService | getFromPouch")

    return new Promise((resolve, reject) => {
      this.pdb.get("words")
        .then( (doc) => {
          // clear null values
          resolve( JSON.parse(doc.entries).filter( (e) => e !== null ) )
        })
        .catch( (err) => reject(err) )
    })
  }

  getFromFb() {
    console.log( "DbService | getFromFb" )

    return new Promise((resolve, reject) => {
      firebase.database().ref(this.entriesKey)
          .once('value')
          .then(  (snapshot) => resolve( snapshot.val() ))
          .catch( (err) => reject(err) )
    })
  }

  insertOrUpdate(doc) {
    console.log( "DbService | insertOrUpdate" )

    return new Promise((resolve, reject) => {
      this.pdb.get(doc._id)
      .then( (_doc) => {
          doc._rev = _doc._rev
          console.log("DbService | insertOrUpdate | update will resolve")
          resolve(this.pdb.put(doc))
      }).catch( (err) => {
          console.log(err)
          console.log("DbService | insertOrUpdate | insert will resolve")
          resolve(this.pdb.put(doc))
      })
    })
  }

}
