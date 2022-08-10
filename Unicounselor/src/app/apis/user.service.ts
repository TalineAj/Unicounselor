import { Injectable } from '@angular/core';
import {addDoc, Firestore} from '@angular/fire/firestore';
import {collection} from '@firebase/firestore';

export interface User {
id: any;
email: any;
name: any;
}
@Injectable({
  providedIn: 'root'
})
export class UserService{

  constructor(private firestore: Firestore) { }
  //Testing
addUser(user: User){
  const userRef = collection(this.firestore,'users');
  return addDoc(userRef,user);
}

}
