import { Component, OnInit } from '@angular/core';
import {Router, RouterEvent} from '@angular/router';
import {Storage} from '@ionic/storage';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  activePath = '';
  logged: boolean;
  admin: boolean;

  pages: any;

  pagesNotLogin = [
    {
      name: 'Home',
      path: '/menu/home',
      icon: 'home'
    },
    {
      name: 'Schedule',
      path: '/menu/schedule',
      icon: 'calendar'
    },
    {
      name: 'Login',
      path: '/menu/login',
      icon: 'log-in'
    },
    {
      name: 'Register',
      path: '/menu/register',
      icon: 'pencil'
    },
    {
      name: 'Profile',
      path: '/menu/profile',
      icon: 'person'
    },
    {
      name: 'Home Admin',
      path: '/menu/home-admin',
      icon: 'home'
    },
    {
      name: 'Add event',
      path: '/menu/add-event',
      icon: 'calendar'
    },
    {
      name: 'Add location',
      path: '/menu/add-location',
      icon: 'location'
    },
  ];

  pagesUser = [
    {
      name: 'Home',
      path: '/menu/home',
      icon: 'home'
    },
    {
      name: 'Schedule',
      path: '/menu/schedule',
      icon: 'calendar'
    },
    {
      name: 'Profile',
      path: '/menu/profile',
      icon: 'person'
    },
  ];

  pagesAdmin = [
    {
      name: 'Home Admin',
      path: '/menu/home-admin',
      icon: 'home'
    },
    {
      name: 'Add event',
      path: '/menu/add-event',
      icon: 'calendar'
    },
    {
      name: 'Add location',
      path: '/menu/add-location',
      icon: 'location'
    },
  ];

  constructor(private router: Router, private storage: Storage, private navCtrl: NavController) {
    this.router.events.subscribe((event: RouterEvent) => {
      if (event !== null){
        this.activePath = event.url;
      }
    });
  }

  // ngOnInit(){
  //   this.getLogin();
  //   console.log('test2');
  // }

  async getLogin(){
    await this.storage.get('logged').then( value => {
      console.log(value);
      if (value !== null){
        if (value === 11){
          this.pages = this.pagesAdmin;
          console.log(this.pages);
        }else {
          this.pages = this.pagesUser;
          console.log('test3');
        }
        console.log('logged true');
      }else if (value === null) {
          this.pages = this.pagesNotLogin;
          console.log('logged false');
      }
    });

    // this.storage.get('admin').then( value1 => {
    //   if (value1 !== null){

    //   }
    // });
  }

  ngOnInit(){
    // this.navCtrl.setRoot(this.navCtrl.getActive().component);
    // this.getLogin();
    this.pages = this.pagesNotLogin;
    console.log('masuk menu');
  }



}
