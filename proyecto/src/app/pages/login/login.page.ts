import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthServiceService } from 'src/app/services/auth.service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  opt: string = 'signin';

  constructor(private menu: MenuController, private authSvc: AuthServiceService, private router: Router) { }

  ngOnInit() {
    this.menu.enable(false);
  }

  async onRegister(email,password){
    try {
      const user = await this.authSvc.register(email.value, password.value);
      if(user){
        console.log('User ->',user);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Usuario Registrado',
          showConfirmButton: false,
          timer: 1500,
          heightAuto: false
        })
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo crear el usuario',
        showConfirmButton: false,
        timer: 1500,
        heightAuto: false
      })
    }
  }

  async onLogin(email,password){
    try {
      const user = await this.authSvc.login(email.value, password.value);
      if(user){
        console.log('User ->',user.email);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Iniciado Sesión',
          showConfirmButton: false,
          timer: 1500,
          heightAuto: false
        })
        this.router.navigate(['/rate']);
      }
    }catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Mal ingresados datos',
        showConfirmButton: false,
        timer: 1500,
        heightAuto: false
      })
      console.log(error);
    }
  }

}
