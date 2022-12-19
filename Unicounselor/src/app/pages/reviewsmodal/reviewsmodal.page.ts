import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import {
  AlertController,
  LoadingController,
  ToastController,
} from '@ionic/angular';
import { ReviewsService, Review } from 'src/app/apis/reviews.service';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Firestore } from '@angular/fire/firestore';
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
  noreviews = 0;
  fetchedreviews = [];

  constructor(
    private firestore: Firestore,
    private navParams: NavParams,
    private modalController: ModalController,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private reviewsService: ReviewsService
  ) {}

  async ngOnInit() {
    //getting props
    this.firstname = this.navParams.get('fname');
    this.lastname = this.navParams.get('lname');
    this.studentname = this.navParams.get('student');

    //retreiving the reviews of selected counselor
    const counselorRef = collection(this.firestore, 'Reviews');
    const q = query(
      counselorRef,
      where('counselor', '==', this.firstname + ' ' + this.lastname)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      this.noreviews = 1;

      const obj = JSON.parse(JSON.stringify(doc.data()));

      this.fetchedreviews.push(obj);
    });
  }
  closeModal() {
    this.modalController.dismiss();
  }

  async onSubmit(form: NgForm) {
    const loading = await this.loadingController.create({
      message: `Submitting review`,
    });
    await loading.present();
    //Checking if fields are valid
    if (
      form.value.rating === '' ||
      form.value.review === '' ||
      form.value.rating > 5 ||
      form.value.rating < 0
    ) {
      const toast1 = await this.toastController.create({
        message: 'Please enter a valid rating (0-5) and a review ',
        duration: 4000,
      });
      loading.dismiss();
      await toast1.present();
      return;
    }
    this.review = {
      student: this.studentname,
      counselor: this.firstname + ' ' + this.lastname,
      review: form.value.review,
      rating: form.value.rating,
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
