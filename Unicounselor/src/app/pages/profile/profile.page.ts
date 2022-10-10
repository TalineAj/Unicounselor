import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {LoadingController, NavController} from '@ionic/angular';
import { AuthService } from 'src/app/apis/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
id: any;
user: any;
username: any;
  constructor( private authService: AuthService, private route: Router,
    private loadingController: LoadingController, private nav: NavController ) { }

  ngOnInit() {
      //get the student and sending their name to the my appointments page to query the appointments of that student
      //Could later change it and do it like appointmentsc
      this.id =  this.authService.getCurrentUserId();
  if(this.id){
    //there is a signed in user
    this.authService.getUserById(this.id).subscribe(res =>{
      this.user = res;
      this.username = this.user.firstname + ' '+ this.user.lastname;
      console.log(this.username);
    });
  }else{
   console.log('no user signed in');
  }
  }
pushPage(){

  this.nav.navigateForward(`/myappointments/${this.username}`);
}



 async logout(){
  const loading = await this.loadingController.create({
    message: `Logging out`,
  });
  await loading.present();

  this.authService.logout();

  this.route.navigate(['/login']);
loading.dismiss();
 }

}
