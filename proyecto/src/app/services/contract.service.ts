import { Injectable } from '@angular/core';
import { docSnapshots, Firestore } from '@angular/fire/firestore';
import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { collectionData } from 'rxfire/firestore';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { Contract } from '../domain/contract';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class ContractService {

  private contractsCollection: AngularFirestoreCollection<Contract>;
  private contracts: any;



  constructor(private firestore: Firestore,private afs: AngularFirestore) {
    this.contractsCollection = afs.collection<Contract>('contracts');
    this.contracts = this.contractsCollection.valueChanges();
  }
  addProduct(contract: Contract) {
    this.contractsCollection.add(Object.assign({}, contract));
  }
  crearContacto(contrato: Contract): Promise<void>{
    const documento = doc(collection(this.firestore, 'contratos'));
    return setDoc(documento, contrato);
  }
}