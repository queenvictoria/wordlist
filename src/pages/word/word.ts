import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EntryService } from "../../providers/entry-service"
import { Observable } from "rxjs/Observable";

import * as Swiper from 'swiper'

@Component({
  selector: 'page-word',
  templateUrl: 'word.html'
})
export class WordPage {

  entries$: Observable<any[]>
  entries: any
  entriesForSwiper: any
  language: string
  mainSwiper: any
  mainSwiperOptions = { initialSlide: 2 }
  index: number

  @ViewChild('mainSwipe') mainSwipe

  constructor(
    public entryService: EntryService,
    public navCtrl: NavController,
    public navParams: NavParams
    ) {
    this.entryService.language$.subscribe( (data) => this.language = data )

    this.index = navParams.get("index")
    console.log("WordPage | this.index", this.index)
    console.log(this.index)

    // make a temp array with our selected word and the ones either side of it
    this.entryService.entries$.subscribe( (entries) => {
      this.entries = entries
      this.setEntriesForSwiper()
      console.log(this.entriesForSwiper)
    })

  }

  ngOnInit() {
    console.log("WordPage | ngOnInit")
  }

  ionViewDidLoad() {
    console.log('WordPage | ionViewDidLoad')

    this.mainSwiper = new Swiper(this.mainSwipe.nativeElement, this.mainSwiperOptions)
    console.log("this.mainSwiper.slides", this.mainSwiper.slides)
    console.log("this.mainSwiper.activeIndex", this.mainSwiper.activeIndex)

    this.mainSwiper.on('onSlideNextEnd', (e) => {
      ++this.index
      console.log("this.index NOW", this.index)
      console.log("adding", this.entries[this.index+1].lx)

      this.entriesForSwiper.push( this.entries[this.index+1] )
      this.mainSwiper.update()
      console.log(this.entriesForSwiper)
      console.log("this.mainSwiper.slides", this.mainSwiper.slides)
      console.log("this.mainSwiper.activeIndex", this.mainSwiper.activeIndex)
    })

  }

  setEntriesForSwiper() {
    this.entriesForSwiper = [
       this.entries[this.index-2],
       this.entries[this.index-1],
       this.entries[this.index],
       this.entries[this.index+1],
       this.entries[this.index+2]
    ]
    console.log("** doing setEntriesForSwiper")
    console.log("this.index", this.index)
    console.log("this.entriesForSwiper", this.entriesForSwiper)

  }

}
