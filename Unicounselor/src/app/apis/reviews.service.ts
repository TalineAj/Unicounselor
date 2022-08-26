import { Injectable } from '@angular/core';
import {Firestore} from '@angular/fire/firestore';
import {addDoc, collectionData, doc, docData, getDoc, getDocs , setDoc} from '@angular/fire/firestore';
import {collection, limit , query, orderBy} from '@firebase/firestore';

export interface Review{
  studentname: string;
  counselor: string;
  review: string;
  rating: number;
}
@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

constructor(private firestore: Firestore) { }

  addReview(review: Review){
  const reviewRef = collection(this.firestore,'Reviews');
  return addDoc(reviewRef,review);
    }




}
