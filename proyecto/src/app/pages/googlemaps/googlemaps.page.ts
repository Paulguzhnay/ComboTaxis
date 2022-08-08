import { Component, OnInit, Input, Renderer2, ElementRef, ViewChild, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { GooglemapsService } from '../../services/googlemaps.service';

import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { MenuController, ModalController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { pedidoCliente } from 'src/app/domain/pedidoCliente';
declare var google: any;
@Component({
  selector: 'app-googlemaps',
  templateUrl: './googlemaps.page.html',
  styleUrls: ['./googlemaps.page.scss'],
})
export class GooglemapsPage implements OnInit {

      // coordenadas cuenca
      @Input() position = {  
        lat: -2.898116,
        lng: -78.99958149999999
  };
  @Input() positionD = {  
    lat: 0,
    lng: 0
};

  label = {
    titulo:'Seleccione',
    subtitulo: 'su destino'
} 
map: any;
marker: any;
markerD: any;
markerDestino:any;
infowindow: any;
positionSet: any
positionSetD: any

//-
address: string;

latitude: number;
longitude: number;
@ViewChild('map') divMap: ElementRef;

constructor(private renderer: Renderer2,
  @Inject(DOCUMENT) private document,
  private googlemapsService: GooglemapsService,
  public modalController: ModalController,
  private geolocation: Geolocation,
  private nativeGeocoder: NativeGeocoder,) { }

  ngOnInit(): void {
    this.init();

    console.log('position ->', this.position)
}

async init() {

  this.googlemapsService.init(this.renderer, this.document).then( () => {
        this.initMap();
  }).catch( (err) => {    
        console.log(err);
  });
  
}

initMap() {

  const position = this.position;

  let latLng = new google.maps.LatLng(position.lat, position.lng);
  let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true,
        clickableIcons: false,
  };

  this.map = new google.maps.Map(this.divMap.nativeElement, mapOptions);
  this.marker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        draggable: false,
  });
  this.markerDestino = new google.maps.Marker({
    map: this.map,
    animation: google.maps.Animation.BOUNCE,
    draggable: false,
});


  this.clickHandleEvent();
  this.infowindow = new google.maps.InfoWindow();
  this.addMarker(position);
  this.setInfoWindow(this.marker, this.label.titulo, this.label.subtitulo);
  this.setInfoWindow(this.markerDestino, this.label.titulo, this.label.subtitulo);

}

clickHandleEvent() {

  this.map.addListener('click', (event: any) => {
        const position = {
              lat: event.latLng.lat(),
              lng: event.latLng.lng(),
        };
        this.addMarker(position);

  });

}

addMarker(position: any): void {

  let latLng = new google.maps.LatLng(position.lat, position.lng);

  // aqui se agrega los marcadores
  this.marker.setPosition(latLng);

  this.map.panTo(position);
  this.positionSet = position;

}

addDestino(positionD: any): void {
  this.positionSetD=positionD;

}


setInfoWindow(marker: any, titulo: string, subtitulo: string) {

  const contentString  =  '<div id="contentInsideMap">' +
                          '<div>' +
                          '</div>' +
                          '<p style="font-weight: bold; margin-bottom: 5px;">' + titulo + '</p>' +
                          '<div id="bodyContent">' +
                          '<p class"normal m-0">'
                          + subtitulo + '</p>' +
                          '</div>' +
                          '</div>';
  this.infowindow.setContent(contentString);
  this.infowindow.open(this.map, marker);

}



//--------------------------------------------------------------------
loadMap() {
  this.geolocation.getCurrentPosition().then((resp) => {
    const position = this.position;


    let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.getAddressFromCoords(resp.coords.latitude, resp.coords.longitude);

    this.map = new google.maps.Map(this.divMap.nativeElement, mapOptions);

    this.map.addListener('dragend', () => {

      this.latitude = this.map.center.lat();
      this.longitude = this.map.center.lng();

      this.getAddressFromCoords(this.map.center.lat(), this.map.center.lng())


    });
    this.map = new google.maps.Map(this.divMap.nativeElement, mapOptions);

    this.marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      draggable: false,
});



this.clickHandleEvent();
this.infowindow = new google.maps.InfoWindow();
this.addMarker(position);
//this.cliente.ubicacionDF=positionD;

this.setInfoWindow(this.marker, this.label.titulo, this.label.subtitulo);




  }).catch((error) => {
    console.log('Error getting location', error);
  });
}
getAddressFromCoords(lattitude, longitude) {
  console.log("getAddressFromCoords " + lattitude + " " + longitude);
  this.positionD.lat=lattitude
  this.positionD.lng=longitude
  console.log("logD "+this.positionD.lng)
  console.log("latD "+this.positionD.lat)
  const positionD = this.positionD;      
  this.addDestino(positionD);
  let options: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };

  this.nativeGeocoder.reverseGeocode(lattitude, longitude, options)
    .then((result: NativeGeocoderResult[]) => {
      this.address = "";
      let responseAddress = [];
      for (let [key, value] of Object.entries(result[0])) {
        if (value.length > 0)
          responseAddress.push(value);

      }
      responseAddress.reverse();
      for (let value of responseAddress) {
        this.address += value + ", ";
      }
      this.address = this.address.slice(0, -2);
    })
    .catch((error: any) => {
      this.address = "Address Not Available!";
    });

}
aceptar() {
  console.log('click aceptar -> ', this.positionSet);
  console.log('click aceptarD -> ', this.positionSetD);
  this.modalController.dismiss({pos: this.positionSet,posD: this.positionSetD})
  this.modalController.dismiss({posD: this.positionSetD})
}

}
