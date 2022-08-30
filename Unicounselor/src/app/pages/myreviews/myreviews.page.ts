import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/apis/auth.service';
import { collection, query, where, getDocs } from 'firebase/firestore';
import {Firestore} from '@angular/fire/firestore';
@Component({
  selector: 'app-myreviews',
  templateUrl: './myreviews.page.html',
  styleUrls: ['./myreviews.page.scss'],
})
export class MyreviewsPage implements OnInit {
  id: any;
  user: any;
  name: any;
  fetchedreviews =[];
  constructor(private firestore: Firestore, private authService: AuthService) { }

  ngOnInit() {
    this.id =  this.authService.getCurrentUserId();
    if(this.id){
     //there is a signed in user
     this.authService.getUserById(this.id).subscribe(res =>{
       this.user = res;
       this.name = this.user.firstname + ' ' + this.user.lastname;
       this.getReviews();
      });
    }else{
    console.log('no user signed in');
    }
  }
  async getReviews(){
     //retreiving the reviews of selected counselor
     const counselorRef =collection(this.firestore,'Reviews');
     const q = query(counselorRef, where('counselor', '==', this.name));
     const querySnapshot = await getDocs(q);
     querySnapshot.forEach((doc) => {
       // doc.data() is never undefined for query doc snapshots
       // console.log(doc.id, ' =>' , doc.data());
       const obj = JSON.parse(JSON.stringify(doc.data()));
       // obj.id = doc.id;
       //obj.eventId = doc.id;
     this.fetchedreviews.push(obj);
     });
  }

}
