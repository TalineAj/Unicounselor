import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { doc , docData, Firestore, updateDoc, getFirestore} from '@angular/fire/firestore';
import { createUserWithEmailAndPassword,getAuth } from '@firebase/auth';
import {Photo} from '@capacitor/camera';
import {ref, Storage} from '@angular/fire/storage';
import { getDownloadURL, uploadString } from '@firebase/storage';
//testing
// import {collectionData, Firestore} from '@angular/fire/firestore';
// import {collection} from '@firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth,
    private firestore: Firestore,
    private storage: Storage) { }
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
//letting the user upload their image
async uploadImage(cameraFile: Photo){
  console.log('entered');
 const user = this.auth.currentUser;
 const path = `uploads/${user.uid}/profile.png`;
 const storageRef = ref(this.storage,path);
 console.log('path '+path);
 try{
  await uploadString(storageRef,cameraFile.base64String,'base64');
  console.log('image urlll: ');
  const imageUrl = await getDownloadURL(storageRef);
  console.log('image urlll: '+ imageUrl);
  const userRef = doc(this.firestore,`Users/${user.uid}`);
  await updateDoc(userRef,{
    imageUrl,
  });
  console.log('addedimg');
  return true;
 }catch(error){
  return false;
 }
}


}










