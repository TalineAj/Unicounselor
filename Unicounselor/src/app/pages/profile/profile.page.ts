import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import {
  LoadingController,
  NavController,
  AlertController,
} from '@ionic/angular';
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
  imagePresent: boolean;

  constructor(
    private alertController: AlertController,
    private authService: AuthService,
    private route: Router,
    private loadingController: LoadingController,
    private nav: NavController
  ) {}

  ngOnInit() {
    //get the student and sending their name to the my appointments page to query the appointments of that student
    this.id = this.authService.getCurrentUserId();
    if (this.id) {
      //there is a signed in user
      this.authService.getUserById(this.id).subscribe((res) => {
        this.user = res;
        this.username = this.user.firstname + ' ' + this.user.lastname;
    //Checking for the profile picture of the user
    if (res.imageUrl === undefined) {
          this.imagePresent = false;
        } else {
          this.imagePresent = true;
        }
      });
    } else {
      console.log('no user signed in');
    }
  }
  async changeImage() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Photos,
    });
    if (image) {
      const loading = await this.loadingController.create();
      await loading.present();
      const res = await this.authService.uploadImage(image);
      loading.dismiss();
      if (!res) {
        const alert = await this.alertController.create({
          header: 'An error occured',
          message: 'upload failed',
          buttons: ['OK'],
        });
      }
    }
  }
  pushPage() {
    this.nav.navigateForward(`/myappointments/${this.username}`);
  }

  async logout() {
    const loading = await this.loadingController.create({
      message: `Logging out`,
    });
    await loading.present();

    this.authService.logout();

    this.route.navigate(['/login']);
    loading.dismiss();
  }
}
