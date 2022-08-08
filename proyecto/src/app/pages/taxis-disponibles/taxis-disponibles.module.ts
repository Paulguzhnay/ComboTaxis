import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TaxisDisponiblesPageRoutingModule } from './taxis-disponibles-routing.module';

import { TaxisDisponiblesPage } from './taxis-disponibles.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TaxisDisponiblesPageRoutingModule
  ],
  declarations: [TaxisDisponiblesPage]
})
export class TaxisDisponiblesPageModule {}
