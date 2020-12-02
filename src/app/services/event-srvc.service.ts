import { Injectable } from '@angular/core';
import {Event} from '../model/event';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class EventSrvcService {
  private dbPath = '/event';
  eventRef: AngularFireList<Event> = null;

  constructor(private db: AngularFireDatabase) {
    this.eventRef = db.list(this.dbPath);
  }

  getAll(): AngularFireList<Event> {
    return this.eventRef;
  }

  // get(key): AngularFireList<Event>{
  //
  // }

  create(event: Event): any{
    return this.eventRef.push(event);
  }
  update(key: string, value: any): any{
    return this.eventRef.update(key, value);
  }
  delete(key: string): any{
    return this.eventRef.remove(key);
  }
}
