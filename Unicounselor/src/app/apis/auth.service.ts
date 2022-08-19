import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { doc , docData, Firestore, getDoc, getFirestore} from '@angular/fire/firestore';
import { createUserWithEmailAndPassword,getAuth } from '@firebase/auth';
//testing
// import {collectionData, Firestore} from '@angular/fire/firestore';
// import {collection} from '@firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private auth: Auth,
    private firestore: Firestore) { }

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

  getCurrentUserId(){
  const auth = getAuth();
  const user = auth.currentUser;
  if (user) {
  //this returns the authenticated user (uid, email....)
 const id = user.uid;
  return id;


  } else {
console.log('no user signed');
    // No user is signed in.
  }
}

 getUserById(id){
  const userRef = doc(this.firestore,`Users/${id}`);
    return docData(userRef, {idField : 'id'});

}


}










