import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/apis/auth.service';
import { UserService, Sum } from 'src/app/apis/user.service';

@Component({
  selector: 'app-myappointments',
  templateUrl: './myappointments.page.html',
  styleUrls: ['./myappointments.page.scss'],
})
export class MyappointmentsPage implements OnInit {
sum: Sum;
  id: any;

  constructor(private authService: AuthService,
    private userService: UserService) { }
  ngOnInit() {


    // this.id =  this.authService.getCurrentUserId();
  }
  // async onSubmit(form: NgForm) {
  // this.sum = form.value;
  // const sums = {
  //   review : 'sdf',
  //   rating: '2'
  // };
  // this.userService.addSum(sums,this.id);
  // }

}
