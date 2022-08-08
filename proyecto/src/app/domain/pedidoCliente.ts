import { Time } from "@angular/common";

export interface pedidoCliente {
    fecha:Date;
    hora:string;
    valorPagar:number;
    ubicacion: {
        lat: number;
        lng: number;
    }

    ubicacionDF: {
        lat: number;
        lng: number;
    }
    
}