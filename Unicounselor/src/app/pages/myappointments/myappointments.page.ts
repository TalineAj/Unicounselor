import { Component, OnInit } from '@angular/core';
import { AppointmentsService } from 'src/app/apis/appointments.service';
import { collection, query, where, getDocs } from 'firebase/firestore';
import {Firestore} from '@angular/fire/firestore';
import { ModalController, NavParams } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
import { AuthService } from 'src/app/apis/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-myappointments',
  templateUrl: './myappointments.page.html',
  styleUrls: ['./myappointments.page.scss'],
})
export class MyappointmentsPage implements OnInit {
  id: any;
  user: any;
  username = null;
  appointments =[];

  constructor(private authService: AuthService, private firestore: Firestore, private activatedRoute: ActivatedRoute) { }
async  ngOnInit() {
this.username = this.activatedRoute.snapshot.paramMap.get('myusername');


  const appointmentsRef =collection(this.firestore,'Appointments');
  //to only get counselors
  const q = query(appointmentsRef, where('student', '==', this.username));
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
