import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {LoadingController, NavController} from '@ionic/angular';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  validationForm: FormGroup;
  logged = false;
  errorMessage: string = '';
  validationMessages = {
    'email': [
      { type: 'required', message: 'Email is required.'},
      { type: 'pattern', message: 'Enter a valid email.'}
    ],
    'password': [
      { type: 'required', message: 'Password is required.'},
      { type: 'minlength', message: 'Password must be at least 5 characters long.'}
    ]
  };

  constructor(private nav: NavController,
              private auth: AuthService,
              private storage: Storage,
              private formBuilder: FormBuilder,
              public loadingCtrl: LoadingController,
              ) { }

  ngOnInit() {
    this.validationForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ]))
    });
  }

  loginUser(value) {

    this.auth.loginUser(value).then(
        res => {
          console.log(res);
          this.logged = true;
          if (this.logged) {
            if (value.email === 'admin@blonation.com') {
              this.storage.set('logged', 11);
              this.nav.navigateForward('/menu/home-admin');

            } else {
              this.storage.set('logged', 1);
              // console.log('bukan admin');
              this.nav.navigateForward('/menu/home');
            }
          }
        }, err => {
          console.log(err);
          this.errorMessage = err.message;
        });

  }




}
