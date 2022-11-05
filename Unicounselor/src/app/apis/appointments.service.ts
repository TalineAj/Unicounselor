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
profileImage: any;
profileImagec: any;
}
export interface Status{
  messagec: string;
  status: string;
}
export interface Statusstudent{
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
  setStatus(status: Status , id: any){
  const docRef = doc(this.firestore,'Appointments',id);
  return setDoc(docRef,status,{merge: true});
    }
    setStatusstudent(status: Statusstudent , id: any){
      const docRef = doc(this.firestore,'Appointments',id);
      return setDoc(docRef,status,{merge: true});
        }

}
