import { Injectable } from '@angular/core';
import {addDoc, collectionData, doc, docData, Firestore, getDoc} from '@angular/fire/firestore';
import {collection} from '@firebase/firestore';
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
  getTipById(id){
    const tipsRef = doc(this.firestore,`tips/${id}`);
    return docData(tipsRef, {idField : 'id'});
  }
}
