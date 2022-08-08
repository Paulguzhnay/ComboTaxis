/* eslint-disable quote-props */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/semi */

import { Contract } from 'src/app/domain/contract';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { MenuController, ModalController } from '@ionic/angular';

import { ContractService } from 'src/app/services/contract.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { waitForAsync } from '@angular/core/testing';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.page.html',
  styleUrls: ['./contract.page.scss'],
})
export class ContractPage implements OnInit {
  contractTaxi: Contract = new Contract();
  createContactoForm: FormGroup;
  bandera: boolean;

  // eslint-disable-next-line @typescript-eslint/member-ordering
  @ViewChild('createForm') createForm: FormGroupDirective;
  constructor(
    private modalController: ModalController,
    private contractServicio: ContractService,
    private router: Router,
    private menu: MenuController
  ) {}
  ionViewWillEnter() {
    this.menu.enable(true);
   }
  ngOnInit() {
    this.contractTaxi.callePrincipal = '';
    this.contractTaxi.calleSecundaria = '';
    this.contractTaxi.formaPago = '';
    this.contractTaxi.referencia = '';
    this.contractTaxi.sector = '';
  }
  submitForm() {
    this.createForm.onSubmit(undefined);
  }
   crearContacto() {
    this.bandera = false;
    // eslint-disable-next-line eqeqeq
    if (
      this.contractTaxi.callePrincipal == '' ||
      this.contractTaxi.calleSecundaria == '' ||
      this.contractTaxi.referencia == '' ||
      this.contractTaxi.sector == '' ||
      this.contractTaxi.formaPago == ''
    ) {
      console.log('Vacios');
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'LLene todos los casilleros',
        heightAuto: false,
      });
    } else {
      console.log(this.contractTaxi);

      // this.contractServicio.crearContacto(this.contractTaxi);
      this.contractServicio.addProduct(this.contractTaxi)
      this.contractTaxi = new Contract();



      Swal.fire({
        heightAuto: false,
        position: 'center',
        icon: 'success',
        title: 'Se a relizado con exito el contrato',
        showConfirmButton: true,
        showCancelButton: false,
        confirmButtonColor: '#3085d6',

        confirmButtonText: 'OK'
      }).then((result) => {
        if (result.isConfirmed) {
          console.log("redirigir")
          this.router.navigate(['/loading']);
        }
      })


      // eslint-disable-next-line @typescript-eslint/semi
      this.contractTaxi.callePrincipal = '';
      this.contractTaxi.calleSecundaria = '';
      this.contractTaxi.formaPago = '';
      this.contractTaxi.referencia = '';
      this.contractTaxi.sector = '';

    }



  }

}

