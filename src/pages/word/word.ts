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
  entriesLength: any
  entriesForSwiper: any = []
  entriesForSwiperStr: string // just for testing
  language: string
  mainSwiper: any
  mainSwiperOptions: any = {
    initialSlide: 0,
    observer: true
  }
  index: number

  @ViewChild('mainSwipe') mainSwipe

  constructor(
    public entryService: EntryService,
    public navCtrl: NavController,
    public navParams: NavParams
    ) {

    // console.log("WordPage")

    // get the current language
    this.entryService.language$.subscribe( (data) => this.language = data )

    // the index of the selected word
    this.index = navParams.get("index")
    console.log("init", this.index)

    // update the initial slide
    if (this.index >= 1) this.mainSwiperOptions.initialSlide = 1

    console.log("initialSlide", this.mainSwiperOptions.initialSlide)
    // make a temp array with our selected word and the ones either side of it
    this.entryService.entries$.subscribe( (entries) => {
      this.entriesLength = entries.length
    })

  }

  ngOnInit() {
  }

  ionViewDidLoad() {
    console.log("this.mainSwiperOptions",this.mainSwiperOptions)
    this.mainSwiper = new Swiper(this.mainSwipe.nativeElement, this.mainSwiperOptions)

    this.setEntriesForSwiper()

    this.mainSwiper.on('onTransitionEnd', (e) => {
      if (e.swipeDirection == 'next') {
        // back to the list if we are at the end
        if ( this.index+1 == this.entriesLength ) this.navCtrl.pop()
        this.index++
        if ( this.index < this.entriesLength-1 ) this.mainSwiper.appendSlide( this.dodgyInnerHTML(this.index+1) )
        this.mainSwiper.removeSlide(0)
      }
      if (e.swipeDirection == 'prev') {
        // back to the list if we are at the beginning
        if ( this.index == 0 ) this.navCtrl.pop()
        this.index--
        if ( this.index >= 1 ) this.mainSwiper.prependSlide( this.dodgyInnerHTML(this.index-1) )
        this.mainSwiper.removeSlide(this.mainSwiper.slides.length)
      }
      console.log("onTransitionEnd **", e.swipeDirection)
    })
  }

  setEntriesForSwiper() {
    console.log("setEntriesForSwiper this.index", this.index)
    if ( this.index >= 1 ) this.mainSwiper.appendSlide( this.dodgyInnerHTML(this.index - 1) )
    this.mainSwiper.appendSlide( this.dodgyInnerHTML(this.index) )
    if ( this.index < this.entriesLength-1 ) this.mainSwiper.appendSlide( this.dodgyInnerHTML(this.index + 1) )
 }

  dodgyInnerHTML(index) {
    console.log('dodgyInnerHTML', index)
    let word = this.entryService.getByIndex(index)
    if ( this.language == 'SOM' ) {
      return `<div class='swiper-slide'>
                <div class="row"><h1>` + word.lx + `</h1></div>
                <div class="row"><p>` + word.de + `</p></div>
              </div>`
    } else {
      return `<div class='swiper-slide'>
                <div class="row"><h1>` + word.de + `</h1></div>
                <div class="row"><p>` + word.lx + `</p></div>
              </div>`
    }
  }
}
