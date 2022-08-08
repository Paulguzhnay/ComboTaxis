import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TaxisOperacionPageRoutingModule } from './taxis-operacion-routing.module';

import { TaxisOperacionPage } from './taxis-operacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TaxisOperacionPageRoutingModule
  ],
  declarations: [TaxisOperacionPage]
})
export class TaxisOperacionPageModule {}
