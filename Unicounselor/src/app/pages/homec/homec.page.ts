import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/apis/auth.service';

@Component({
  selector: 'app-homec',
  templateUrl: './homec.page.html',
  styleUrls: ['./homec.page.scss'],
})
export class HomecPage implements OnInit {
  today = new Date().toLocaleDateString();
  id: any;
  user: any;
  firstname: any;
  name: any;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.id =  this.authService.getCurrentUserId();
  if(this.id){
   //there is a signed in user
   this.authService.getUserById(this.id).subscribe(res =>{
     this.user = res;
     this.firstname = this.user.firstname;
     this.name = this.user.firstname + ' ' + this.user.lastname;
   });
  }else{
  console.log('no user signed in');
  }
  }

}
