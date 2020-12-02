import { Component, OnInit } from '@angular/core';
import {EventSrvcService} from '../services/event-srvc.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage implements OnInit {
  event: any;
  constructor(private eventSrvc: EventSrvcService,) { }

  ngOnInit() {
    this.eventSrvc.getAll().snapshotChanges().pipe(
        map(changes =>
            changes.map(c => ({key: c.payload.key, ...c.payload.val()})))
    ).subscribe( data => {
      this.event = data;
    });
  }

}
