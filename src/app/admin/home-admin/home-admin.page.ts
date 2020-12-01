import { Component, OnInit } from '@angular/core';
import {IonItemSliding} from '@ionic/angular';
import {LoactionSrvcService} from '../../services/loaction-srvc.service';
import {map} from 'rxjs/operators';
import {EventSrvcService} from '../../services/event-srvc.service';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.page.html',
  styleUrls: ['./home-admin.page.scss'],
})
export class HomeAdminPage implements OnInit {
  location: any;
  event: any;

  type: string;
  constructor(
      private locSrvc: LoactionSrvcService,
      private eventSrvc: EventSrvcService,
  ) { }

  ngOnInit() {
    this.type = 'aplicants';
    this.locSrvc.getAll().snapshotChanges().pipe(
        map(changes =>
            changes.map(c => ({key: c.payload.key, ...c.payload.val()})))
    ).subscribe( data => {
      this.location = data;
    });

    this.eventSrvc.getAll().snapshotChanges().pipe(
        map(changes =>
            changes.map(c => ({key: c.payload.key, ...c.payload.val()})))
    ).subscribe( data => {
      this.event = data;
    });
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

}
