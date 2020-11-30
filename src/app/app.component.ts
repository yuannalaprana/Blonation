import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  logged: boolean;
  admin: boolean;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ionViewDidEnter(){
    this.storage.get('logged').then( value => {
      if (value !== null){
        this.logged = true;
        this.storage.get('admin').then( value1 => {
          if (value1 !== null){
            if (value1 === true){
              this.admin = true;
            }else {
              this.admin = false;
            }
          }
        });
      }
    });
  }
}
