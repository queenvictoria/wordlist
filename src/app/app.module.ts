import { NgModule } from '@angular/core'
import { IonicApp, IonicModule } from 'ionic-angular'
import { MyApp } from './app.component'

import { HomePage } from '../pages/home/home'
import { WordlistPage } from '../pages/wordlist/wordlist'
import { WordPage } from '../pages/word/word'

// providers
import { DbService } from '../providers/db-service'
import { EntryService } from '../providers/entry-service'

// Import the AF2 Module
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2'

export const firebaseConfig = {
  apiKey: "AIzaSyAgdp1GBRFe_eTfgU_g72V3y4QhxvcMwbY",
  authDomain: "somali-2c680.firebaseapp.com",
  databaseURL: "https://somali-2c680.firebaseio.com",
  storageBucket: "somali-2c680.appspot.com",
  messagingSenderId: "288003980045"
}
const myFirebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
}


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    WordlistPage,
    WordPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    WordlistPage,
    WordPage
  ],
  providers: [
    DbService,
    EntryService
  ]
})
export class AppModule {}
