import { Injectable } from '@angular/core';
import {Firestore} from '@angular/fire/firestore';
import {addDoc, collectionData, doc, docData, getDoc, getDocs , setDoc} from '@angular/fire/firestore';
import {collection, limit , query, orderBy} from '@firebase/firestore';

export interface Appointment {
student: string;
counselor: string;
date: any;
message: string;
status: string;
}

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

  constructor(private firestore: Firestore,
    ) { }
    addAppointment(appointment: Appointment){
  const appointmentRef = collection(this.firestore,'Appointments');
  return addDoc(appointmentRef,appointment);

    }


}
