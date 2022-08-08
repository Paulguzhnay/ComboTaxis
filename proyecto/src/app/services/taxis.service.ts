import { Injectable } from '@angular/core';
import { docSnapshots, Firestore } from '@angular/fire/firestore';
import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { collectionData } from 'rxfire/firestore';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { Taxi } from '../domain/taxi';

@Injectable({
  providedIn: 'root'
})
export class TaxisService {

  constructor(private firestore: Firestore) { }

  listaTaxis(): Observable<Taxi[]>{
    const listTaxis = collection(this.firestore, 'taxis');
    return collectionData(listTaxis, {idField: 'id'})
    .pipe(map(taxis => taxis as Taxi[]));
  }

  


}