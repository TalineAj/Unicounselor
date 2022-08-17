import { Injectable } from '@angular/core';
import {addDoc, Firestore} from '@angular/fire/firestore';
import {collection} from '@firebase/firestore';

export interface User {
id: any;
email: any;
name: any;
password: any;
level: any;
}
@Injectable({
  providedIn: 'root'
})
export class UserService{

  constructor(private firestore: Firestore) { }
addUser(user: User){
  const userRef = collection(this.firestore,'Users');
  return addDoc(userRef,user);
}

}
