import { Component, Input } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { EntryService } from "../../providers/entry-service"

@Component({
  selector: 'language-chooser',
  templateUrl: 'language-chooser.html'
})
export class LanguageChooserComponent {

  language: any
  somaliButtonColour: string
  englishButtonColour: string

  constructor(
    public entryService: EntryService
    ) {

    // console.log("LanguageChooser | subscribe to language$")
    this.entryService.language$.subscribe( (language) => {
          this.language = language
          console.log("have this.language", this.language)
          this.doButtonColours(language)
        })

  }


  setLanguage(language) {
    console.log("setLanguage", language)
    this.doButtonColours(language)
    this.entryService.setLanguage(language)
  }
  doButtonColours(language) {
    if (language == 'SOM') {
      this.somaliButtonColour = "primary"
      this.englishButtonColour = "default"
    } else {
      this.somaliButtonColour = "default"
      this.englishButtonColour = "primary"
    }
  }
}
