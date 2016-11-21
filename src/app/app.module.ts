import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { LetterPage } from '../pages/letter/letter'
import { LettersPage } from '../pages/letters/letters'
import { WordPage } from '../pages/word/word'

// providers
import { AuthService } from '../providers/auth-service'
import { DataService } from '../providers/data-service'
import { Util } from '../providers/util'


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
    LetterPage,
    LettersPage,
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
    LetterPage,
    LettersPage,
    WordPage
  ],
  providers: [
    AuthService,
    DataService,
    Util
  ]
})
export class AppModule {}
