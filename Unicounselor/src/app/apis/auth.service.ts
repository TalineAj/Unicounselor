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

  async getCurrentUser(){

  const auth = getAuth();
  const user = auth.currentUser;
  if (user) {
  //this returns the authenticated user (uid, email....)
  //will now  get the user in the user's collection that matches this user
const id = user.uid;
console.log(id);
  // const userRef = doc(this.firestore,`Users/fSpw2E5TvCPCSDxL29e0SBowYOw1`);
    // return docData(userRef, {idField : 'id'});

const db = getFirestore();

  const userRef = doc(db,'Users','fSpw2E5TvCPCSDxL29e0SBowYOw1');
// try {
    const docSnap = getDoc(userRef);
        return (await docSnap).data();

// } catch(error) {
//     console.log(error)
// ;}
  } else {
    // No user is signed in.
  }



  // const docRef = doc(db, "cities", "2l3bcSGs2vZBIc3RODwp");
}




}










