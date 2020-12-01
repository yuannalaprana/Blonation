import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {Location} from '../model/location';

@Injectable({
  providedIn: 'root'
})
export class LoactionSrvcService {
  private dbPath = '/location';
  locationRef: AngularFireList<Location> = null;

  constructor(private db: AngularFireDatabase) {
    this.locationRef = db.list(this.dbPath);
  }

  getAll(): AngularFireList<Location> {
    return this.locationRef;
  }

  create(location: Location): any{
    return this.locationRef.push(location);
  }
  update(key: string, value: any): any{
    return this.locationRef.update(key, value);
  }
  delete(key: string): any{
    return this.locationRef.remove(key);
  }
}
