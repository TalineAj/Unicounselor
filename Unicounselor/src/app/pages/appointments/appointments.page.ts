import { Component, OnInit } from '@angular/core';
import { AppointmentsService } from 'src/app/apis/appointments.service';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Firestore } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
import { AuthService } from 'src/app/apis/auth.service';
import { ReviewsmodalPage } from '../reviewsmodal/reviewsmodal.page';
import { timer } from 'rxjs';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.page.html',
  styleUrls: ['./appointments.page.scss'],
})
export class AppointmentsPage implements OnInit {
  student: any;
  id: any;
  user: any;
  counselors = [];
  nocounselors: any;
 // loaded = false; another way to improve lazy loading
  time = 10; //Way to deal with lazy loading
 // lazyLoadImage = '../../../assets/images/no-p.png'; another way to improve lazy loading
  constructor(
    private modalController: ModalController,
    private firestore: Firestore,
    private appointmentsService: AppointmentsService,
    private authService: AuthService
  ) {}

  async ngOnInit() {
    timer(2000).subscribe(() => (this.time = -1));//Average waiting time for an image to load on normal internet would be 2 seconds
    const counselorRef = collection(this.firestore, 'Users');
    //to only get counselors
    const q = query(counselorRef, where('field', '!=', ''));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const obj = JSON.parse(JSON.stringify(doc.data()));
      this.counselors.push(obj);
    });
    // this.loaded = true; //another way to improve lazy loading
    //get the signed in student
    this.id = this.authService.getCurrentUserId();
    if (this.id) {
      //there is a signed in user
      this.authService.getUserById(this.id).subscribe((res) => {
        this.user = res;
        this.student = this.user.firstname + ' ' + this.user.lastname;
      });
    } else {
      console.log('no user signed in');
    }
  }
  async openModal(i) {
    //when clicked it takes the user to the booking modal of the particularly selected counselor
    const modal = await this.modalController.create({
      component: ModalPage,
      componentProps: {
        fname: this.counselors[i].firstname, //used i, since the i in the array of counselors is the same one for both the html and ts
        lname: this.counselors[i].lastname,
        field: this.counselors[i].field,
        student: this.student,
        image: this.user.imageUrl,
        counselorimage: this.counselors[i].imageUrl,
      },
    });
    modal.present();
  }
  async openReviewsModal(i) {
        //when clicked it takes the user to the rating modal of the particularly selected counselor
    const modal = await this.modalController.create({
      component: ReviewsmodalPage,
      componentProps: {
        fname: this.counselors[i].firstname,
        lname: this.counselors[i].lastname,
        field: this.counselors[i].field,
        student: this.student,
      },
    });
    modal.present();
  }
}
