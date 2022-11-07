/* eslint-disable no-trailing-spaces */
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/apis/auth.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AlertController,
  LoadingController,
  ToastController,
} from '@ionic/angular';
import { Auth } from '@angular/fire/auth';
import { UserService, User } from 'src/app/apis/user.service';
import * as internal from 'stream';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  userInfo: User;
  isStudent: any;
  displayDate: number;
  constructor(
    private authService: AuthService,
    private userService: UserService,    private activatedRoute: ActivatedRoute,
    private route: Router,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) {
  //  Checking if this route was accesed by student and or counselors to customize the page and code accordingly
    this.activatedRoute.queryParamMap.subscribe(params => {
      this.isStudent = params.get('student');
      console.log(this.isStudent); 
      if(this.isStudent==='true'){
        this.displayDate =1;
      }else{
        this.displayDate = 0;
      }
      console.log(this.displayDate);
    });
 
    
  }

  //regex to check password
  check = (password) =>
    !!password.match(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%* #+=\(\)\^?&])[A-Za-z\d$@$!%* #+=\(\)\^?&]{3,}$/
    );
  async onSubmit(form: NgForm) {
    const loading = await this.loadingController.create({
      message: `Signing up`,
    });
    await loading.present();
    //Making sure fields are not empty
    if (
      form.value.password === '' ||
      form.value.email === '' ||
      form.value.gender === '' ||
      form.value.date === '' ||
      form.value.lastname === '' ||
      form.value.firstname === ''
    ) {
      const toast = await this.toastController.create({
        message: 'Please fill all fields',
        duration: 3000,
      });
      loading.dismiss();
      await toast.present();
      return;
    }
    //Making sure the email format is valid
    if (!form.value.email.endsWith('@student.com')) {
      const toast = await this.toastController.create({
        message: 'The email should end with @student.com',
        duration: 4000,
      });
      loading.dismiss();
      await toast.present();
      return;
    }
    // Checking if password has at least 3 characters at least 1 alphabet, 1 Number and 1 Special Character
    if (form.value.password.length < 5 || !this.check(form.value.password)) {
      const toast = await this.toastController.create({
        message:
          // eslint-disable-next-line max-len
          'Password is too weak. Enter a password longer than five characters that contains at least one number, one character and one special character',
        duration: 5000,
      });
      loading.dismiss();
      await toast.present();
      return;
    }
    // loading.dismiss();
    else {
      const user = await this.authService.register(form.value);
console.log(user);
      await loading.dismiss();
      if (user) {
        //Will be used later to redirect to appropriate home
        //to be changed
        this.userInfo = {
          firstname: form.value.firstname,
          lastname: form.value.lastname,
          dateofbirth: form.value.dateofbirth,
          gender: form.value.gender,
        };

        this.userService.addUser(this.userInfo, user.user.uid);
        // console.log('working till here');
        this.authService.uploadDefaultImage();

        this.route.navigate(['/login']);
      } else {
        const alert = await this.alertController.create({
          message: 'Signup unsuccessful',
          buttons: ['Close'],
        });
        await alert.present();
      }
    }
  }

  ngOnInit() {}
}
