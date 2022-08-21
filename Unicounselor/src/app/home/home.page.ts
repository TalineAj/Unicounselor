import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../apis/auth.service';

// import {LoginService} from '../apis/login.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
   today = new Date().toLocaleDateString();
   id: any;
   user: any;
   name: any;
  constructor( private route: Router, private authService: AuthService) {
this.id =  this.authService.getCurrentUserId();
  if(this.id){
   //there is a signed in user
   this.authService.getUserById(this.id).subscribe(res =>{
     this.user = res;
     this.name = this.user.firstname;
   });
  }else{
  console.log('no user signed in');
  }
  }


  redirect()
  {
    this.route.navigate(['/login']);
  }

}
