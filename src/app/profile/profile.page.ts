import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {NavController} from '@ionic/angular';

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
      private auth: AuthService
  ) { }

  ngOnInit() {
    this.auth.userUid().subscribe(res => {
      if (res !== null){
        this.userEmail = res.email;
      }else {
        this.nav.navigateBack('/login');
      }
    }, err => {
      console.log(err);
    });
  }

  logout(){
    this.auth.logoutUser().then( res => {
      console.log('res: ', res);
      this.nav.navigateBack('/home');
    }).catch(error => {
      console.log(error);
    });
  }

}
