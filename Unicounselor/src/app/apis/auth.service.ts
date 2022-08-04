import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { createUserWithEmailAndPassword } from '@firebase/auth';
//testing
// import {collectionData, Firestore} from '@angular/fire/firestore';
// import {collection} from '@firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth) { }

async register({email,password}){
 try{
    const user = await  createUserWithEmailAndPassword(this.auth,email,password);
    return user;

  }catch (e){
    return null;
  }
}
async login({email,password}){
  //loging using email and password try catch in order to be able to know if login successfull or not
   try{
     const user = await  signInWithEmailAndPassword(this.auth,email,password);
     return user;
   }catch (e){
     return null;
   }
 }

 logout(){
  //logout from account
 return signOut(this.auth);
  }
}






//Testing
// getNotes(){
//   const notesRef = collection(this.firestore,'notes');
//   return collectionData(notesRef);
// }












