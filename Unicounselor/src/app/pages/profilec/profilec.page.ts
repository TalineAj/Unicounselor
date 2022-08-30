import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/apis/auth.service';

@Component({
  selector: 'app-profilec',
  templateUrl: './profilec.page.html',
  styleUrls: ['./profilec.page.scss'],
})
export class ProfilecPage implements OnInit {

  constructor( private route: Router,private loadingController: LoadingController,private authService: AuthService) { }

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
