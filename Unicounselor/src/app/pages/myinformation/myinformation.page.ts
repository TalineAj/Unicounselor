import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/apis/auth.service';
import { UserService, User } from 'src/app/apis/user.service';
@Component({
  selector: 'app-myinformation',
  templateUrl: './myinformation.page.html',
  styleUrls: ['./myinformation.page.scss'],
})
export class MyinformationPage implements OnInit {
  id: any;
  user: any;
  firstname= null;
  lastname= null;
  dateofbirth= null;
  gender= null;
  userInfo: User;


  constructor(private authService: AuthService,
    private userService: UserService,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private toastController: ToastController) { }
  ngOnInit() {
     this.id =  this.authService.getCurrentUserId();
if(this.id){
  //there is a signed in user
  this.authService.getUserById(this.id).subscribe(res =>{
    this.user = res;
    console.log(this.user);
    this.firstname = this.user.firstname;
    this.lastname = this.user.lastname;
    this.dateofbirth = this.user.dateofbirth;
    this.gender = this.user.gender;
  });
}else{
 console.log('no user signed in');
}
  }
//regex to check password
check = (password)=> !!password.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%* #+=\(\)\^?&])[A-Za-z\d$@$!%* #+=\(\)\^?&]{3,}$/);
;


    async onSubmit(form: NgForm) {
      const loading = await this.loadingController.create({
        message: `Updating information`,
      });
      await loading.present();
  //Making sure fields are not empty
if(form.value.gender==='' || form.value.date==='' ||
form.value.lastname==='' || form.value.firstname==='')
{const toast = await this.toastController.create({
 message: 'Please fill all fields',
 duration: 3000,
});
loading.dismiss();
await toast.present();
return;
}
   else{
      await loading.dismiss();
    this.userInfo = form.value;
    this.userService.updateUser(this.userInfo,this.id);
 console.log(this.userInfo);

          }
        }

}
