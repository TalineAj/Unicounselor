import { Injectable } from '@angular/core';
import {Firestore} from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {
  counselors = [];

  constructor(private firestore: Firestore,
    ) { }
    //NOT USED
  // getCounselor(){
    // const counselorRef =collection(this.firestore,'Users');
    // return collectionData(counselorRef);
  // }

}
