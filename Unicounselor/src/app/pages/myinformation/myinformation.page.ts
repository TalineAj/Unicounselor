import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/apis/auth.service';

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
  email= null;
  constructor(private authService: AuthService) { }
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
    this.email = this.user.email;
  });
}else{
 console.log('no user signed in');
}
  }

}
