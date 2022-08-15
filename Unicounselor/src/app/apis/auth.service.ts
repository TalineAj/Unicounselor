import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { createUserWithEmailAndPassword,getAuth } from '@firebase/auth';
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

getCurrentUser(){
//TESTED IN TIPS

//   const auth = getAuth();
//   const user = auth.currentUser;
//   if (user) {
//     // User is signed in, see docs for a list of available properties
//     // https://firebase.google.com/docs/reference/js/firebase.User
//     // ...
//     console.log(user.uid);
// return user.uid;
//   } else {
//     // No user is signed in.
//   }




}




}










