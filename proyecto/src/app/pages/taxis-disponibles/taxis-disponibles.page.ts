import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Taxi } from 'src/app/domain/taxi';
import { TaxisService } from 'src/app/services/taxis.service';


@Component({
  selector: 'app-taxis-disponibles',
  templateUrl: './taxis-disponibles.page.html',
  styleUrls: ['./taxis-disponibles.page.scss'],
})
export class TaxisDisponiblesPage implements OnInit {
  public listTaxisDisponibles: Observable<Taxi[]>;
  constructor(private taxisServicio: TaxisService) { }

  ngOnInit() {
    this.listTaxisDisponibles = this.taxisServicio.listaTaxis();
  }

}
