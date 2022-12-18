import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/apis/auth.service';
import { TipsService, Tip } from 'src/app/apis/tips.service';

@Component({
  selector: 'app-tipsc',
  templateUrl: './tipsc.page.html',
  styleUrls: ['./tipsc.page.scss'],
})
export class TipscPage implements OnInit {
tip: Tip;
user: any;
username: any;
id: any;
  constructor(private tipService: TipsService, private loadingController: LoadingController,
    private toastController: ToastController, private authService: AuthService) { }

  ngOnInit() {
    this.id =  this.authService.getCurrentUserId();
    if(this.id){
      //there is a signed in user
      this.authService.getUserById(this.id).subscribe(res =>{
        this.user = res;
        this.username = this.user.firstname + ' '+ this.user.lastname;
      });
    }else{
     console.log('no user signed in');
    }
  }
  async onSubmit(form: NgForm) {
    console.log(form.value);
    const loading = await this.loadingController.create({
      message: `Submitting tip`,
    });
    await loading.present();
  if(form.value.tip==='' || form.value.title===''|| form.value.tip===null || form.value.title===null){
  const toast1 = await this.toastController.create({
  message: 'Please enter a title and a tip',
  duration: 4000,
  });
  loading.dismiss();
  await toast1.present();
  return;
  }
  this.tip = {
    author: this.username,
    tip: form.value.tip,
    title: form.value.title
  };
  await this.tipService.addTip(this.tip);
    await loading.dismiss();

    const toast = await this.toastController.create({
      message: 'Tip Successfully submitted',
      duration: 4000,
    });
    loading.dismiss();
    form.reset();
    await toast.present();
  }

}
