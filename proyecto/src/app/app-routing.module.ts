import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'pedidos',
    loadChildren: () => import('./pages/pedidos/pedidos.module').then( m => m.PedidosPageModule)
  },
  {
    path: 'listar-pedidos',
    loadChildren: () => import('./pages/listar-pedidos/listar-pedidos.module').then( m => m.ListarPedidosPageModule)
  },
  {
    path: 'googlemaps',
    loadChildren: () => import('./pages/googlemaps/googlemaps.module').then( m => m.GooglemapsPageModule)
  },
  {
    path: 'contract',
    loadChildren: () => import('./pages/contract/contract.module').then( m => m.ContractPageModule)
  },
  {
    path: 'loading',
    loadChildren: () => import('./pages/loading/loading.module').then( m => m.LoadingPageModule)
  },
  {
    path: 'rate',
    loadChildren: () => import('./pages/rate/rate.module').then( m => m.RatePageModule)
  },
  {
    path: 'taxis-disponibles',
    loadChildren: () => import('./pages/taxis-disponibles/taxis-disponibles.module').then( m => m.TaxisDisponiblesPageModule)
  },
  {
    path: 'taxis-operacion',
    loadChildren: () => import('./pages/taxis-operacion/taxis-operacion.module').then( m => m.TaxisOperacionPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
