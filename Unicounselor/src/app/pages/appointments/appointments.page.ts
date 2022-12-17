import { Component, OnInit } from '@angular/core';
import { AppointmentsService } from 'src/app/apis/appointments.service';
import { collection, query, where, getDocs } from 'firebase/firestore';
import {Firestore} from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
import { AuthService } from 'src/app/apis/auth.service';
import { ReviewsmodalPage } from '../reviewsmodal/reviewsmodal.page';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import {timer} from 'rxjs';

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
  loaded = false;
  time =10;
  lazyLoadImage = '../../../assets/images/no-p.png';
  constructor(private modalController: ModalController, private firestore: Firestore, private appointmentsService: AppointmentsService,
    private authService: AuthService) { }


 async ngOnInit() {
  timer(2000).subscribe(() => (this.time = -1));
  const counselorRef =collection(this.firestore,'Users');
  //to only get counselors
  const q = query(counselorRef, where('field', '!=', ''));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    // console.log(doc.id, ' =>' , doc.data());
    const obj = JSON.parse(JSON.stringify(doc.data()));
    // obj.id = doc.id;
    //obj.eventId = doc.id;
    this.counselors.push(obj);
    console.log(this.counselors);
  });
  this.loaded = true;
  //get the student
  this.id =  this.authService.getCurrentUserId();
  if(this.id){
    //there is a signed in user
    this.authService.getUserById(this.id).subscribe(res =>{
      this.user = res;
      this.student = this.user.firstname + ' '+ this.user.lastname;
    });
  }else{
   console.log('no user signed in');
  }
  // this.lazyLoadImage = '../../../assets/images/no-p.png';

  }
async openModal(i){
  const modal = await this.modalController.create(
    {
component: ModalPage,
componentProps:{
  fname : this.counselors[i].firstname,
  lname: this.counselors[i].lastname,
  field: this.counselors[i].field,
  student: this.student,
  image: this.user.imageUrl,
  counselorimage: this.counselors[i].imageUrl,
}
});
modal.present();

}
async openReviewsModal(i){
  const modal = await this.modalController.create(
    {
component: ReviewsmodalPage,
componentProps:{
  fname : this.counselors[i].firstname,
  lname: this.counselors[i].lastname,
  field: this.counselors[i].field,
  student: this.student

}
});
modal.present();

}


}
