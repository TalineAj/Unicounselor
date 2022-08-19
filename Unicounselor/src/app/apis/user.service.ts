import { Injectable } from '@angular/core';
import {addDoc, doc, Firestore, setDoc} from '@angular/fire/firestore';
import {collection} from '@firebase/firestore';
import {RegisterPage} from 'src/app/pages/register/register.page';
export interface User {
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
// addUser(user: User){
//   const userRef = collection(this.firestore,'Users');
//   return addDoc(userRef,user);

// }
addUser(user: User, id: any){
const docRef = doc(this.firestore, 'Users', id);
return setDoc(docRef,user);
}
updateUser(user: User, id: any){
  const docRef = doc(this.firestore, 'Users', id);
  return setDoc(docRef,user);
  }
}
