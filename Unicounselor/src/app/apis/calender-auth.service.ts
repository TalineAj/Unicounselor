import { Injectable } from '@angular/core';
import {deleteDoc, Firestore} from '@angular/fire/firestore';
import {collection, limit , query, orderBy} from '@firebase/firestore';
import {addDoc, collectionData, doc, docData, getDoc, getDocs , setDoc} from '@angular/fire/firestore';

export interface Event{
    title: string;
    startTime: Date;
    endTime: Date;
    allDay: boolean;
  }


// declare let gapi: any;

@Injectable({
  providedIn: 'root'
})
export class CalenderAuthService {
//   user$: Observable<firebase.User>;
//   calendarItems: any[];

  constructor(private firestore: Firestore) {

//     this.initClient();
//     this.user$ = afAuth.authState;
  }
//    // Initialize the Google API client with desired scopes
//    initClient() {
//     gapi.load('client', () => {
//       console.log('loaded client');

//       // It's OK to expose these credentials, they are client safe.
//       gapi.client.init({
//         apiKey: 'AIzaSyAm0ArK8nzIEaE7dV_z252JNMjiH-yU-zU',
//         clientId: 'YOUR_OAUTH2_CLIENTID', //?
//         discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
//         scope: 'https://www.googleapis.com/auth/calendar'
//       });

//       gapi.client.load('calendar', 'v3', () => console.log('loaded calendar'));

//     });
//   }
    addEvent(event: Event){
    const calendarRef = collection(this.firestore,'Calender');
    return addDoc(calendarRef,event);
      }

      getEvent(){
        const eventRef =collection(this.firestore,'Calender');
        return collectionData(eventRef);
      }
      deleteEvent(event: Event, id: any){
        const eventRef =doc(this.firestore,'Calender', id);
        return deleteDoc(eventRef);
         }
}
