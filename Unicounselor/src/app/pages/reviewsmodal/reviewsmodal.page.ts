import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import {
  AlertController,
  LoadingController,
  ToastController,
} from '@ionic/angular';
import { from } from 'rxjs';
import { AuthService } from 'src/app/apis/auth.service';
import { ReviewsService, Review } from 'src/app/apis/reviews.service';

@Component({
  selector: 'app-reviewsmodal',
  templateUrl: './reviewsmodal.page.html',
  styleUrls: ['./reviewsmodal.page.scss'],
})
export class ReviewsmodalPage implements OnInit {
  firstname: any;
  lastname: any;
  review: Review;
  studentname: any;
  constructor(private navParams: NavParams, private modalController: ModalController, private alertController: AlertController,
    private loadingController: LoadingController,
    private toastController: ToastController, private reviewsService: ReviewsService) { }

  ngOnInit() {
    this.firstname = this.navParams.get('fname');
    this.lastname = this.navParams.get('lname');
    this.studentname = this.navParams.get('student');
  }
  closeModal(){
    this.modalController.dismiss();
  }



  async onSubmit(form: NgForm) {
    const loading = await this.loadingController.create({
      message: `Submitting review`,
    });
    await loading.present();
  //More checking regarding the length of review
  if(form.value.rating==='' || form.value.review==='' || form.value.rating>5){
  const toast1 = await this.toastController.create({
  message: 'Please enter a valid rating (0-5) and a review ',
  duration: 4000,
  });
  loading.dismiss();
  await toast1.present();
  return;
  }
  this.review = {
    student : this.studentname,
    counselor: this.firstname + ' '+ this.lastname,
    review:form.value.review,
    rating:form.value.rating
  };
    const review = await this.reviewsService.addReview(this.review);
    await loading.dismiss();

    const toast = await this.toastController.create({
      message: 'Review and Rating Successfully submitted',
      duration: 5000,
    });
    loading.dismiss();
    form.reset();
    await toast.present();
  }

}
