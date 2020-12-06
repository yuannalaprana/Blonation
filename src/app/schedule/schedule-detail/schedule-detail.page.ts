import { Component, OnInit } from '@angular/core';
import {EventSrvcService} from '../../services/event-srvc.service';
import {map} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {Storage} from '@ionic/storage';
import {LoactionSrvcService} from '../../services/loaction-srvc.service';
import {AuthService} from '../../services/auth.service';
import {Appointments} from '../../model/appointments';
import firebase from 'firebase';
import auth = firebase.auth;
import {AppointmentSrvcService} from '../../services/appointment-srvc.service';
import {ToastController} from '@ionic/angular';

declare var goggle: any;

@Component({
  selector: 'app-schedule-detail',
  templateUrl: './schedule-detail.page.html',
  styleUrls: ['./schedule-detail.page.scss'],
})
export class ScheduleDetailPage implements OnInit {
  event: any;
  detail: any[];
  temp: any;
  user: any;
  tempUser: any;
  location: any;
  logged = false;
  key: string;

  userid: string;
  date: string;
  datenow: any;
  userDonatedate: any;
  dateEvent: any;
  tempDate: any;
  donatedInLastMonth = false;
  bmiUser: any;
  sentAppointment = false;
  appointmen: Appointments;
  massageToast: string;
  colorToast = 'danger';

  // map
  map: any;
  distance: any;


  constructor(
      private eventSrvc: EventSrvcService,
      private activRoute: ActivatedRoute,
      private locSrvc: LoactionSrvcService,
      private storage: Storage,
      private auth: AuthService,
      private appointmentSrvc: AppointmentSrvcService,
      private toastController: ToastController,
      private router: Router,
  ) {

  }

  ngOnInit() {
    this.auth.userDetails().subscribe(res => {
      if (res !== null){
        this.userid = res.uid;
        console.log('uid: ', this.userid);
      }
    }, err => {
      console.log(err);
    });

    this.date = new Date().toISOString();
    setTimeout(() => {
    }, 1000);


  }

  ionViewWillEnter(){
    this.activRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('id')){ return; }
      this.key = paramMap.get('id');
      console.log(this.key);
    });

    this.locSrvc.getAll().snapshotChanges().pipe(
        map(changes =>
            changes.map(c => ({key: c.payload.key, ...c.payload.val()})))
    ).subscribe( data => {
      this.location = data;
      for (const abc of this.location){
        abc.idloc = abc.key;
        delete abc.key;
      }

      this.eventSrvc.getAll().snapshotChanges().pipe(
          map(changes =>
              changes.map(c => ({key: c.payload.key, ...c.payload.val()})))
      ).subscribe( data1 => {
        for (const abc of data1){
          if (abc.key === this.key){
            for (const keyloc of this.location){
              if (abc.keyLocation === keyloc.idloc){
                this.temp = abc;
                this.temp.addressLocation = keyloc.addressLocation;
                this.temp.cordinate = keyloc.cordinate;
                this.temp.nameLocation = keyloc.nameLocation;
                this.temp = [].concat(this.temp);
                console.log(this.temp[0].cordinate);
                const coord = this.temp[0].cordinate.split(', ');
                console.log(coord);
              }
            }
          }
        }
      });
      this.auth.getAll().snapshotChanges().pipe(
          map(changes =>
              changes.map(c => ({key: c.payload.key, ...c.payload.val()})))
      ).subscribe( data1 => {
        // this.user = data;
        for (const usera of data1){
          if (usera.uid === this.userid){
            this.user = usera;
          }
        }
        console.log(this.user);
      });
    });


    this.storage.get('logged').then( value => {
      if (value !== null) {
        this.logged = true;
      } else if (value === null) {
      }
    });


  }


  apply(){
    if (this.user.donated === 'true'){
      this.massageToast = 'You can\'t apply 2 events';
      this.colorToast = 'danger';
    }
    else {
      this.datenow = new Date();
      console.log(this.datenow);
      this.userDonatedate = new Date(this.user.lastDonateDate);
      console.log(this.userDonatedate);
      if ((this.datenow.getTime() > this.userDonatedate.getTime()) || this.user.lastDonateDate === ''){
        console.log('lebih besar');
        this.bmiUser = this.user.weight / ((this.user.height / 100) * (this.user.height / 100));
        if (this.bmiUser < 18.5){
          this.massageToast = 'Appointment Rejected, you are underweight';
          this.colorToast = 'danger';
        }else if (this.bmiUser > 25){
          this.massageToast = 'Appointment Rejected, you are overweight';
          this.colorToast = 'danger';
        }else if (this.bmiUser < 25 && this.bmiUser > 18.5){
          this.massageToast = 'Appointment has been sent';
          this.colorToast = 'success';
          this.sentAppointment = true;
        }

        if (this.sentAppointment){
          this.appointmen = new Appointments();
          this.appointmen.idUser = this.userid;
          this.appointmen.idEvent = this.temp[0].key;
          this.appointmen.status = false;
          console.log(this.appointmen);
          // create appointment
          this.appointmentSrvc.create(this.appointmen).then(res => {
            console.log(res);
          }).catch(error => console.log(error));
          // update user.donated
          this.user.donated = 'true';
          this.auth.update(this.user.key, this.user).then(res => {
            console.log(res);
          }).catch(error => console.log(error));
        }
      }
      else {
        this.massageToast = 'You can\'t apply again until 1 month';
        this.colorToast = 'danger';
      }
      console.log('else');
    }
    this.presentToast();
    this.router.navigateByUrl('/menu/home');
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: this.massageToast,
      color: this.colorToast,
      duration: 2000
    });
    toast.present();
  }

  getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = this.convert(lat2 - lat1);
    const dLon = this.convert(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(this.convert(lat1)) * Math.cos(this.convert(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
  }

  convert(deg) {
    return deg * (Math.PI / 180);
  }

}
