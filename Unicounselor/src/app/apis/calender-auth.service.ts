import { Injectable } from '@angular/core';
import { deleteDoc, Firestore } from '@angular/fire/firestore';
import { collection, limit, query, orderBy } from '@firebase/firestore';
import {
  addDoc,
  collectionData,
  doc,
  docData,
  getDoc,
  getDocs,
  setDoc,
} from '@angular/fire/firestore';

export interface Event {
  title: string;
  startTime: Date;
  endTime: Date;
  allDay: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class CalenderAuthService {
  constructor(private firestore: Firestore) {}

  addEvent(event: Event) {
    const calendarRef = collection(this.firestore, 'Calender');
    return addDoc(calendarRef, event);
  }

  getEvent() {
    const eventRef = collection(this.firestore, 'Calender');
    return collectionData(eventRef);
  }
  deleteEvent(event: Event, id: any) {
    const eventRef = doc(this.firestore, 'Calender', id);
    return deleteDoc(eventRef);
  }
}
