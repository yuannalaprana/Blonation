import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {Event} from '../model/event';
import {Appointments} from '../model/appointments';

@Injectable({
  providedIn: 'root'
})
export class AppointmentSrvcService {
  private dbPath = '/appointment';
  appRef: AngularFireList<Appointments> = null;

  constructor(private db: AngularFireDatabase) {
    this.appRef = db.list(this.dbPath);
  }

  getAll(): AngularFireList<Appointments> {
    return this.appRef;
  }

  create(app: Appointments): any{
    return this.appRef.push(app);
  }
  update(key: string, value: any): any{
    return this.appRef.update(key, value);
  }
  delete(key: string): any{
    return this.appRef.remove(key);
  }
}
