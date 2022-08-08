import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Taxi } from 'src/app/domain/taxi';
import { TaxisService } from 'src/app/services/taxis.service';

@Component({
  selector: 'app-taxis-operacion',
  templateUrl: './taxis-operacion.page.html',
  styleUrls: ['./taxis-operacion.page.scss'],
})
export class TaxisOperacionPage implements OnInit {
  public listTaxisOperacion: Observable<Taxi[]>;
  constructor(private taxisServicio: TaxisService) { }

  ngOnInit() {
    this.listTaxisOperacion = this.taxisServicio.listaTaxis();
  }

}
