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
import { UserService, User } from 'src/app/apis/user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
userInfo: User;

  constructor(  private authService: AuthService,
    private userService: UserService,
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
    this.userInfo = form.value;
    //to avoid storing password not working
    // this.userInfo.name = form.value.name;
    // this.userInfo.email = form.value.email;
    this.userInfo.id = user.user.uid;
    this.userInfo.password = null; //temporary fix


    this.userService.addUser(this.userInfo);
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
