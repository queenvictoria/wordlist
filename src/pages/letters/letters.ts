import { Component } from '@angular/core'
import { NavController } from 'ionic-angular'
import { AngularFire, FirebaseListObservable } from 'angularfire2'
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'page-letters',
  templateUrl: 'letters.html'
})
export class LettersPage {

  sizeSubject: Subject<any>
  index: FirebaseListObservable<any>
  letters: FirebaseListObservable<any>
  words: any

  searchQuery: string = '';

  constructor(
    public af: AngularFire,
    public navCtrl: NavController,
    ) {

    this.sizeSubject = new Subject();

    // letters for buttons
    this.index = af.database.list('/index/')

    // prepare a list query
    this.letters = af.database.list('/letters/', {
      query: {
        orderByChild: 'letter',
        equalTo: this.sizeSubject
      }
    });
    // subscribe, and set the words child
    // do this here so the template can use virtualScroll
    this.letters.subscribe( (data) => {
      if (data.length > 0) {
        console.log(data)
        this.words = data[0].words
      }
    })
  }

  // change the word list
  filterBy(letter: string) {
    console.log("clicked", letter)
    this.sizeSubject.next(letter)
  }




}
