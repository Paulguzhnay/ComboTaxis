import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Taxis Disponibles', url: 'taxis-disponibles', icon: "car-sport-outline"},
    { title: 'Taxis en Operación', url: 'taxis-operacion', icon: 'people-circle-outline' },
    { title: 'Pedidos', url: 'listar-pedidos', icon: 'people-circle-outline' },
  ];
  constructor() {}
}
