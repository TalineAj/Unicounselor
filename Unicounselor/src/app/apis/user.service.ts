import { Injectable } from '@angular/core';
import { addDoc, doc, Firestore, setDoc } from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';

export interface User {
  firstname: any;
  lastname: any;
  dateofbirth: any;
  gender: any;
}
export interface Sum {
  review: string;
  rating: number;
}
@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private firestore: Firestore) {}
  // addUser(user: User){
  //   const userRef = collection(this.firestore,'Users');
  //   return addDoc(userRef,user);

  // }
  addUser(user: User, id: any) {
    const docRef = doc(this.firestore, 'Users', id);
    return setDoc(docRef, user);
  }
  updateUser(user: User, id: any) {
    //Updates it since same "name=firstname" etc...
    const docRef = doc(this.firestore, 'Users', id);
    return setDoc(docRef, user);
  }
  // addSum(sum: any , id: any){
  // const docRef = doc(this.firestore, 'Users',id);
  // return setDoc(docRef,sum,{merge: true});
  // }
}
