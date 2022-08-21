import { Injectable } from '@angular/core';
import {addDoc, collectionData, doc, docData, Firestore, getDoc, getDocs} from '@angular/fire/firestore';
import {collection, limit , query, orderBy} from '@firebase/firestore';
import { Observable } from 'rxjs';
export interface Tip{
  author: string;
  title: string;
  tip: string;
}

@Injectable({
  providedIn: 'root'
})
export class TipsService {

  constructor(private firestore: Firestore) { }
  addTip(tip: Tip){
    const tipRef = collection(this.firestore,'users');
    return addDoc(tipRef,tip);
  }
  getTips(){
    const tipsRef =collection(this.firestore,'tips');
    return collectionData(tipsRef);
  }
  //did not work
  // async getTwoTips(){
  //   const tipsRef =collection(this.firestore,'tips');
    // return collectionData(tipsRef);
  //   // const q = query(tipsRef, limit(1));
  //   // const querySnapshot = await getDocs(q);
  //   // return querySnapshot;
  //   }

  //  async getTwoTips(){
  // const tipsRef =collection(this.firestore,'tips');
  // const q = query(tipsRef, limit(2));
  // const querySnapshot = await getDocs(q);
  // // eslint-disable-next-line @typescript-eslint/no-shadow
  // querySnapshot.forEach((doc)=>{
  //   console.log(doc.data());
  // });
  // }


  getTipById(id){
    const tipsRef = doc(this.firestore,`tips/${id}`);
    return docData(tipsRef, {idField : 'id'});
  }
}
