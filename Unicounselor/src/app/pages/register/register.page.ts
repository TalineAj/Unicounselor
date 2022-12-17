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
import { UserService, User, Counselor } from 'src/app/apis/user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  userInfo: User;
  isStudent: any;
  displayDate: number;
  counselorInfo: Counselor;
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) {

    //  Checking if this route was accesed by student and or counselors to customize the page and code accordingly
    this.activatedRoute.queryParamMap.subscribe((params) => {
      this.isStudent = params.get('student');
      if (this.isStudent === 'true') {
        //Since in order to sign up as a student, birth field is required
        this.displayDate = 1;
      } else {
        this.displayDate = 0;
      }
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
    //Making sure fields are not empty (common fields between both counselor and student)
    if (
      form.value.password === '' ||
      form.value.email === '' ||
      form.value.gender === '' ||
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
    if (this.isStudent === 'true' && form.value.dateofbirth === '') {
      //specifically for students
      const toast = await this.toastController.create({
        message: 'Please fill all fields',
        duration: 3000,
      });
      loading.dismiss();
      await toast.present();
      return;
    }
    //spedifically for counselors
    if (this.isStudent === 'false' && form.value.field === '') {
      //specifically for students
      const toast = await this.toastController.create({
        message: 'Please fill all fields',
        duration: 3000,
      });
      loading.dismiss();
      await toast.present();
      return;
    }

    //Making sure the email format is valid
    //for students
    if (
      this.isStudent === 'true' &&
      !form.value.email.endsWith('@student.com')
    ) {
      const toast = await this.toastController.create({
        message: 'The email should end with @student.com',
        duration: 4000,
      });
      loading.dismiss();
      await toast.present();
      return;
    }

    //for counselors
    if (this.isStudent === 'false' && !form.value.email.endsWith('@uni.com')) {
      const toast = await this.toastController.create({
        message: 'The email should end with @uni.com',
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
    } else {
      const user = await this.authService.register(form.value);
      await loading.dismiss();
      if (user) {
        if (this.isStudent === 'true') {
          this.userInfo = {
            firstname: form.value.firstname,
            lastname: form.value.lastname,
            dateofbirth: form.value.dateofbirth,
            gender: form.value.gender,
          };
          this.userService.addUser(this.userInfo, user.user.uid);
        }
        if (this.isStudent === 'false') {
          this.counselorInfo = {
            firstname: form.value.firstname,
            lastname: form.value.lastname,
            field: form.value.field,
            gender: form.value.gender,
          };
          this.userService.addUser(this.counselorInfo, user.user.uid);
        }

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
