import { Component, OnInit } from '@angular/core';
import { pedidoCliente } from 'src/app/domain/pedidoCliente';
import { PedidosService } from 'src/app/services/pedidos.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-listar-pedidos',
  templateUrl: './listar-pedidos.page.html',
  styleUrls: ['./listar-pedidos.page.scss'],
})
export class ListarPedidosPage implements OnInit {


  public listaPedido: Observable<pedidoCliente[]>;
  
  constructor(private pedidoServicio: PedidosService) { 
    this.listaPedido = this.pedidoServicio.listaPedidos();
  }

  ngOnInit() {
  }

}
