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
  language: string
  mainSwiper: any
  mainSwiperOptions = { initialSlide: 0 }

  @ViewChild('mainSwipe') mainSwipe

  constructor(
    public entryService: EntryService,
    public navCtrl: NavController,
    public navParams: NavParams
    ) {

    let word = navParams.get("index")
    console.log(word)
    this.mainSwiperOptions.initialSlide = word

    this.entries$ = this.entryService.entries$
    // this.entryService.loadAll()

    this.entryService.language.subscribe( (data) => this.language = data )

  }

  ngOnInit() {
    console.log("WordPage | ngOnInit");
  }

  ionViewDidLoad() {
    console.log('WordPage | ionViewDidLoad');
    this.mainSwiper = new Swiper(this.mainSwipe.nativeElement, this.mainSwiperOptions)
  }

}
