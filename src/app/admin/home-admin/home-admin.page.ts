import { Component, OnInit } from '@angular/core';
import {IonItemSliding} from '@ionic/angular';
import {LoactionSrvcService} from '../../services/loaction-srvc.service';
import {map} from 'rxjs/operators';
import {EventSrvcService} from '../../services/event-srvc.service';
import {AppointmentSrvcService} from '../../services/appointment-srvc.service';
import {AuthService} from '../../services/auth.service';
import {attachView} from '@ionic/angular/providers/angular-delegate';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.page.html',
  styleUrls: ['./home-admin.page.scss'],
})
export class HomeAdminPage implements OnInit {
  location: any;
  event: any;
  applicant: any;
  tempApplicant: any;
  user: any;
  temp: any;

  type: string;
  constructor(
      private locSrvc: LoactionSrvcService,
      private eventSrvc: EventSrvcService,
      private appointmentSrvc: AppointmentSrvcService,
      private auths: AuthService,
  ) { }

  ngOnInit() {
    this.type = 'aplicants';
    this.locSrvc.getAll().snapshotChanges().pipe(
        map(changes =>
            changes.map(c => ({key: c.payload.key, ...c.payload.val()})))
    ).subscribe( data => {
      this.location = data;
      // console.log(this.location);
      for (const abc of this.location){
        abc.idloc = abc.key;
        delete abc.key;
        // console.log(abc);
      }
    });

    this.eventSrvc.getAll().snapshotChanges().pipe(
        map(changes =>
            changes.map(c => ({key: c.payload.key, ...c.payload.val()})))
    ).subscribe( data => {
      this.event = data;
      for (const abc of this.event){
        for (const keyloc of this.location){
          if (abc.keyLocation === keyloc.idloc){
            this.temp = abc;
            this.temp.addressLocation = keyloc.addressLocation;
            this.temp.cordinate = keyloc.cordinate;
            this.temp.nameLocation = keyloc.nameLocation;
          }
        }
      }
    });
    this.auths.getAll().snapshotChanges().pipe(
        map(changes =>
            changes.map(c => ({key: c.payload.key, ...c.payload.val()})))
    ).subscribe( data1 => {
      this.user = data1;
    });

    this.appointmentSrvc.getAll().snapshotChanges().pipe(
        map(changes =>
            changes.map(c => ({key: c.payload.key, ...c.payload.val()})))
    ).subscribe( data => {
      this.applicant = data;
      for (const abc of this.applicant){
          for (const event of this.event) {
            if (abc.idEvent === event.key) {
              this.tempApplicant = abc;
              this.tempApplicant.nameEvent = event.nameEvent;
            }
          }
          for (const user of this.user) {
            console.log(user.key);
            console.log(abc.idUser);
            if (abc.idUser === user.key) {
              this.tempApplicant.nameUser = user.nameFull;
              // this.tempApplicant.golonganDarah = user.bloodtype;
              if (user.bloodtype === '1') {
                this.tempApplicant.golonganDarah = 'A';
              }
              if (user.bloodtype === '2') {
                this.tempApplicant.golonganDarah = 'B';
              }
              if (user.bloodtype === '3') {
                this.tempApplicant.golonganDarah = 'AB';
              }
              if (user.bloodtype === '4') {
                this.tempApplicant.golonganDarah = 'O';
              }
              console.log(this.tempApplicant);
            }
          }
      }


    });

    //
  }

  onFilterUpdate(event: CustomEvent){
    console.log(event.detail);
  }

  acc( slidingItem: IonItemSliding){
    slidingItem.close();
    console.log('Accepted');
  }

  decline(slidingItem: IonItemSliding){
    slidingItem.close();
    console.log('Not Accpted');
  }

  accAplicant( slidingItem: IonItemSliding){
    slidingItem.close();
    console.log('Accepted');
  }

  declineAplicant(slidingItem: IonItemSliding){
    slidingItem.close();
    console.log('Not Accpted');
  }

}
