import { Component, OnInit } from '@angular/core';
import {EventSrvcService} from '../../services/event-srvc.service';
import {map} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-schedule-detail',
  templateUrl: './schedule-detail.page.html',
  styleUrls: ['./schedule-detail.page.scss'],
})
export class ScheduleDetailPage implements OnInit {
  event: any;
  events: any;
  key: string;
  constructor(
      private eventSrvc: EventSrvcService,
      private activRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.activRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('id')){ return; }
      this.key = paramMap.get('id');
    });
    this.eventSrvc.getAll().snapshotChanges().pipe(
        map(changes =>
            changes.map(c => ({key: c.payload.key, ...c.payload.val()})))
    ).subscribe( data => {
      this.event = data;

      this.events = this.event.filter(event => event.key === this.key );
      console.log(this.events);
    });

  }
}
