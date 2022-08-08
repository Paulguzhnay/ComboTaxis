import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.page.html',
  styleUrls: ['./loading.page.scss'],
})
export class LoadingPage implements OnInit {

  constructor(private menu: MenuController, private router: Router) { }
  ionViewWillEnter() {
    this.menu.enable(false);
   }

  ngOnInit() {
  }

  submit(){
    this.router.navigate(['/contract']);
  }

}
