import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TaxisOperacionPage } from './taxis-operacion.page';

const routes: Routes = [
  {
    path: '',
    component: TaxisOperacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaxisOperacionPageRoutingModule {}
