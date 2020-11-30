import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {NavController} from '@ionic/angular';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  userEmail: string;
  userID: string;
  constructor(
      private nav: NavController,
      private auth: AuthService,
      private storage: Storage,
  ) { }

  ngOnInit() {
    this.storage.get('logged').then( value => {
      if (value === null){
        this.nav.navigateBack('/home');
      }
    });


    this.auth.userUid().subscribe(res => {
      if (res !== null){
        this.userEmail = res.email;
      }else {

      }
    }, err => {
      console.log(err);
    });
  }

  logout(){
    this.auth.logoutUser().then( res => {
      console.log('res: ', res);
      this.storage.remove('logged');
      this.storage.remove('admin');
      this.nav.navigateBack('/home');
    }).catch(error => {
      console.log(error);
    });
  }

}
