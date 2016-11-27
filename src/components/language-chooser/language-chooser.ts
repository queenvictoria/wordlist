import { Component } from '@angular/core';
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
          console.log("LanguageChooser | has this.language", this.language)
          this.setButtonColours(language)
        })
  }

  setLanguage(language) {
    console.log("LanguageChooser | setLanguage", language)
    this.setButtonColours(language)
    this.entryService.setLanguage(language)
  }

  setButtonColours(language) {
    if (language == 'SOM') {
      this.somaliButtonColour = "primary"
      this.englishButtonColour = "default"
    } else {
      this.somaliButtonColour = "default"
      this.englishButtonColour = "primary"
    }
  }
}
