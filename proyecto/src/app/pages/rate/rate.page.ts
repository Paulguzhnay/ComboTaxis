import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-rate',
  templateUrl: './rate.page.html',
  styleUrls: ['./rate.page.scss'],
})
export class RatePage implements OnInit {

  constructor(private router: Router, private menu: MenuController) { }
  ionViewWillEnter() {
    this.menu.enable(true);
   }
  ngOnInit() {
  }

}
