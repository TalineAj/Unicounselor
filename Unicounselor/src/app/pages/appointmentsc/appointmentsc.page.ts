import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/apis/auth.service';
import { AppointmentsService } from 'src/app/apis/appointments.service';
import { collection, query, where, getDocs } from 'firebase/firestore';
import {Firestore} from '@angular/fire/firestore';
import { ModalController, NavParams } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-appointmentsc',
  templateUrl: './appointmentsc.page.html',
  styleUrls: ['./appointmentsc.page.scss'],
})
export class AppointmentscPage implements OnInit {
  id: any;
  user: any;
  username = null;
  appointments =[];

  constructor(private authService: AuthService, private firestore: Firestore) { }

    ngOnInit() {

    this.id =  this.authService.getCurrentUserId();
    if(this.id){
      //there is a signed in user
      this.authService.getUserById(this.id).subscribe(res =>{
        this.user = res;
        this.username = this.user.firstname + ' '+ this.user.lastname;
        console.log(this.username);
        this.getCounselors();
      });
    }else{
     console.log('no user signed in');
    }
  }
  async getCounselors(){
    const appointmentsRef =collection(this.firestore,'Appointments');
    //to only get counselors
    const q = query(appointmentsRef, where('counselor', '==', this.username));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, ' =>' , doc.data());
      const obj = JSON.parse(JSON.stringify(doc.data()));
      // obj.id = doc.id;
      //obj.eventId = doc.id;
    this.appointments.push(obj);
    console.log(this.appointments);
  });
  }
}
