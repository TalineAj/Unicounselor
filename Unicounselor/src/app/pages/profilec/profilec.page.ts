import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/apis/auth.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-profilec',
  templateUrl: './profilec.page.html',
  styleUrls: ['./profilec.page.scss'],
})
export class ProfilecPage implements OnInit {
  id: any;
  user: any;
  imagePresent: boolean;
  constructor(
    private alertController: AlertController,
    private route: Router,
    private loadingController: LoadingController,
    private authService: AuthService
  ) {}

  ngOnInit() {
    //get the logged in user to get the picture
    this.id = this.authService.getCurrentUserId();
    if (this.id) {
      //there is a signed in user
      this.authService.getUserById(this.id).subscribe((res) => {
        this.user = res;
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
    console.log(image);
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
