import { Injectable } from '@angular/core';
import {Firestore, setDoc} from '@angular/fire/firestore';
import {addDoc, collectionData, doc, docData, getDoc, getDocs} from '@angular/fire/firestore';
import {collection, limit , query, orderBy} from '@firebase/firestore';
export interface Appointment {
student: string;
counselor: string;
date: any;
message: string;
}

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

  constructor(private firestore: Firestore,
    ) { }
    addAppointment(appointment: Appointment){
      const docRef = doc(this.firestore,'appointment');
      return setDoc(docRef,appointment);
    }


}
