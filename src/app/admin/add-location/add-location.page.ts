import { Component, OnInit } from '@angular/core';
import {LoactionSrvcService} from '../../services/loaction-srvc.service';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {ToastController} from '@ionic/angular';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.page.html',
  styleUrls: ['./add-location.page.scss'],
})
export class AddLocationPage implements OnInit {
  // location: any;
  constructor(
      private srvc: LoactionSrvcService,
      private router: Router,
      private toastController: ToastController) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm){
    this.srvc.create(form.value).then(res => {
      console.log(res);
      this.presentToast();
      this.router.navigateByUrl('/menu/home-admin');
    }).catch(error => console.log(error));

    form.reset();
    this.router.navigateByUrl('/menu/home-admin');
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Location has been added.',
      color: 'success',
      duration: 2000
    });
    toast.present();
  }

}
