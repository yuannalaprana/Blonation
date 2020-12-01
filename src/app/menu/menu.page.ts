import { Component, OnInit } from '@angular/core';
import {Router, RouterEvent} from '@angular/router';
import {Storage} from '@ionic/storage';

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

  constructor(private router: Router, private storage: Storage) {
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
      if (value !== null){
        this.logged = true;
        this.pages = this.pagesUser;
        console.log('logged true');
      }else if (value === null) {
          this.pages = this.pagesNotLogin;
          console.log('logged false');
      }
    });

    // this.storage.get('admin').then( value1 => {
    //   if (value1 !== null){
    //     if (value1 === true){
    //       this.admin = true;
    //       this.pages = this.pagesAdmin;
    //     }else {
    //       this.admin = false;
    //       this.pages = this.pagesUser;
    //       console.log('test3');
    //     }
    //   }
    // });
  }

  ngOnInit(): void {
    this.getLogin();
    console.log('asddd');
  }

  ionViewWillEnter(){
    console.log('ionViewWillEnter');
  }
  ionViewDidEnter(){
    console.log('ionViewDidEnter');
  }



}
