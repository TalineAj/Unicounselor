import { Component, OnInit } from '@angular/core';
import { AppointmentsService } from 'src/app/apis/appointments.service';
import { collection, query, where, getDocs } from 'firebase/firestore';
import {Firestore} from '@angular/fire/firestore';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.page.html',
  styleUrls: ['./appointments.page.scss'],
})
export class AppointmentsPage implements OnInit {
  counselors = [];
  nocounselors: any;
  constructor(private firestore: Firestore, private appointmentsService: AppointmentsService) { }


 async ngOnInit() {
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

  }


}
