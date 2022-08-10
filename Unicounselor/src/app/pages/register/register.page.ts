import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/apis/auth.service';
import {NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import {
  AlertController,
  LoadingController,
  ToastController,
} from '@ionic/angular';
import { Auth } from '@angular/fire/auth';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(  private authService: AuthService,
    private route: Router,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private toastController: ToastController) { }

    async onSubmit(form: NgForm) {
      const loading = await this.loadingController.create({
        message: `Signing up`,
      });
      await loading.present();
      //Making sure both fields are filled
      loading.dismiss();


      const user = await this.authService.register(form.value);
      await loading.dismiss();
      if(user){
        //Will be used later to redirect to appropriate home
                 //to be changed

            this.route.navigate(['/login']);
      }
      else{
        const alert = await this.alertController.create({
                message: 'Login unsuccessful',
                buttons: ['Close'],
              });
              await alert.present();
            }
      }



  ngOnInit() {
  }

}
