import { Injectable } from '@angular/core';
import { docSnapshots, Firestore } from '@angular/fire/firestore';
import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { collectionData } from 'rxfire/firestore';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import {pedidoCliente}  from '../domain/pedidoCliente';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  constructor(private firestore: Firestore) { }

  crearPedido(cliente: pedidoCliente): Promise<void>{
    const documento = doc(collection(this.firestore, 'pedidoClientes'));
    return setDoc(documento, cliente);
  }

  listaPedidos(): Observable<pedidoCliente[]>{
    const listContacto = collection(this.firestore, 'pedidoClientes');
    return collectionData(listContacto, {idField: 'id'})
    .pipe(map(contactos=> contactos as pedidoCliente[]));
  }
}
