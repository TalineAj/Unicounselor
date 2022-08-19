import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {LoadingController} from '@ionic/angular';
import { AuthService } from 'src/app/apis/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor( private authService: AuthService, private route: Router,
    private loadingController: LoadingController ) { }

  ngOnInit() {
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
