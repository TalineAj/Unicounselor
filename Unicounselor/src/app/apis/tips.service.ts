import { Injectable } from '@angular/core';
import {addDoc, collectionData, doc, docData, Firestore, getDoc, getDocs, setDoc} from '@angular/fire/firestore';
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
    const tipsRef = collection(this.firestore,'tips');
    return addDoc(tipsRef,tip);
  }
  getTips(){
    const tipsRef =collection(this.firestore,'tips');
    return collectionData(tipsRef);
  }
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
