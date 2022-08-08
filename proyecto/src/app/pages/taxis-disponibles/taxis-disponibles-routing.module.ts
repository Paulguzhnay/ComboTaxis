import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TaxisDisponiblesPage } from './taxis-disponibles.page';

const routes: Routes = [
  {
    path: '',
    component: TaxisDisponiblesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaxisDisponiblesPageRoutingModule {}
