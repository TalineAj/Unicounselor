/* eslint-disable no-trailing-spaces */
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



//regex to check password
check = (password)=> !!password.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%* #+=\(\)\^?&])[A-Za-z\d$@$!%* #+=\(\)\^?&]{3,}$/);
;


    async onSubmit(form: NgForm) {
      const loading = await this.loadingController.create({
        message: `Signing up`,
      });
      await loading.present();
  //Making sure fields are not empty
if(form.value.password===''|| form.value.email==='' || form.value.gender==='' || form.value.date==='' ||
form.value.lastname==='' || form.value.firstname==='')
{const toast = await this.toastController.create({
 message: 'Please fill all fields',
 duration: 3000,
});
loading.dismiss();
await toast.present();
return;
} 
//Making sure the email format is valid
if(!form.value.email.endsWith('@student.com')&&!form.value.email.endsWith('@uni.com')){
  const toast = await this.toastController.create({
    message: 'The email should end with @student.com or @uni.com',
    duration: 4000,
   });
   loading.dismiss();
   await toast.present();
   return;
}
  // Checking if password has at least 3 characters at least 1 alphabet, 1 Number and 1 Special Character
  if(form.value.password.length<5 || !this.check(form.value.password))
  {const toast = await this.toastController.create({
    // eslint-disable-next-line max-len
    message: 'Password is too weak. Enter a password longer than five characters that contains at least one number, one character and one special character',
    duration: 5000,
  });
  loading.dismiss();
  await toast.present();
  return;
}    
// loading.dismiss();
else{
      const user = await this.authService.register(form.value);

      await loading.dismiss();
      if(user){
        //Will be used later to redirect to appropriate home
                 //to be changed
    this.userInfo = form.value;
    //to avoid storing password not working
    // this.userInfo.name = form.value.name;
    // this.userInfo.email = form.value.email;
    this.userInfo.password = null; //temporary fix

    this.userService.addUser(this.userInfo,user.user.uid);
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
      }



  ngOnInit() {
  }

}
