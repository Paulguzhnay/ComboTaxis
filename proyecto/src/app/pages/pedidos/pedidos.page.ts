import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { pedidoCliente } from 'src/app/domain/pedidoCliente';
import { GooglemapsPage } from '../googlemaps/googlemaps.page';
import { MenuController, ModalController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { PedidosService } from 'src/app/services/pedidos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
})
export class PedidosPage implements OnInit {
  cliente: pedidoCliente = {

    fecha :new Date(),
    hora:'',
    valorPagar:0,
    ubicacion: null,
    ubicacionDF: null,
  };
 
  @ViewChild('map', { static: false }) mapElement: ElementRef;
  map: any;
  address: string;

  latitude: number;
  longitude: number;

  constructor(
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    public menucontroler: MenuController,
    private modalController: ModalController,
    private pedidoServicio: PedidosService,
    private router:Router) {
  }


  ngOnInit() {

  }

  //-----------------------------------------------------------------------------------------------------------------------------------------------

  async addDirection() {

    const ubicacion = this.cliente.ubicacion;
    let positionInput = {  
      lat: -2.898116,
      lng: -78.99958149999999
    };
    if (ubicacion !== null) {
        positionInput = ubicacion; 
    }

    const modalAdd  = await this.modalController.create({
      component: GooglemapsPage,
      mode: 'ios',
      swipeToClose: true,
      componentProps: {position: positionInput}
    });

    await modalAdd.present();
    const {data} = await modalAdd.onWillDismiss();
    if (data) {
      console.log('DATA=',data)
      this.cliente.ubicacion = data.pos;
      this.cliente.ubicacionDF = data.posD;
      
      console.log('this.cliente -> ', this.cliente);
      var R = 3958.8 ; // Radius of the Earth in miles
      var rlat1 = this.cliente.ubicacion.lat * (Math.PI/180); // Convert degrees to radians
      var rlat2 = this.cliente.ubicacionDF.lat * (Math.PI/180); // Convert degrees to radians
      var difflat = rlat2-rlat1; // Radian difference (latitudes)
      var difflon = (this.cliente.ubicacionDF.lng-this.cliente.ubicacion.lng) * (Math.PI/180); // Radian difference (longitudes)

      var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2)));
      var precio=d*3.25

      console.log('DISTANCIA ',d)
      console.log('Precio ',precio)
      precio=Number(precio.toFixed(2));
      this.cliente.valorPagar=precio;
    }

  }

  async crearPedido(values: any){
    const cliente: pedidoCliente = {... values};
    console.log("CLIENTES ",this.cliente)
    const path='pedidoClientes';
    
    this.pedidoServicio.crearPedido(this.cliente);
    this.router.navigate(['/rate']);
  }


}

