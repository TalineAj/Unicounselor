import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/apis/auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {
  AlertController,
  LoadingController,
  NavController,
  ToastController,
} from '@ionic/angular';
import { Auth } from '@angular/fire/auth';
import { timingSafeEqual } from 'crypto';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  student: boolean;
  constructor(
    private authService: AuthService,
    private route: Router,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private nav: NavController,
  ) {}

  async onSubmit(form: NgForm) {
    const loading = await this.loadingController.create({
      message: `Logging in`,
    });
    await loading.present();
    //Making sure both fields are filled
    if (form.value.password === '' || form.value.email === '') {
      const toast = await this.toastController.create({
        message: 'Please fill all fields',
        duration: 3000,
      });
      loading.dismiss();
      await toast.present();
      return;
    } else {
      //since we are returning we dont need the else but its added for extra security

      const user = await this.authService.login(form.value);
      await loading.dismiss();
      if (user) {
        if (form.value.email.endsWith('@uni.com')) {
          this.route.navigate(['/homec']);
        } else {
          this.route.navigate(['/home']);
        }
      } else {
        const alert = await this.alertController.create({
          message: 'Login unsuccessful',
          buttons: ['Close'],
        });
        await alert.present();
      }
    }
  }
  ngOnInit() {}
  redirect(){
    this.student = true;
    this.nav.navigateForward(`/register?student=${this.student}`);

  }
  redirectCounselor(){
    this.student = false;
    this.nav.navigateForward(`/register?student=${this.student}`);
  }

}
