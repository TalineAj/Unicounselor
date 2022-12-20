import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/apis/auth.service';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Firestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-myreviews',
  templateUrl: './myreviews.page.html',
  styleUrls: ['./myreviews.page.scss'],
})
export class MyreviewsPage implements OnInit {
  id: any;
  user: any;
  name: any;
  fetchedreviews = [];
  constructor(private firestore: Firestore, private authService: AuthService) {}

  ngOnInit() {
    this.id = this.authService.getCurrentUserId();
    if (this.id) {
      //there is a signed in user
      this.authService.getUserById(this.id).subscribe((res) => {
        this.user = res;
        this.name = this.user.firstname + ' ' + this.user.lastname;
        this.getReviews();
      });
    } else {
      console.log('no user signed in');
    }
  }
  handleRefresh(event) {
    setTimeout(() => {
      //After refreshing page, the reviews array is reset
      //and the updated reviews in database are fetched
      length = this.fetchedreviews.length;
      for (let i = 0; i < length; i++) {
        this.fetchedreviews.pop();
      }
      this.ngOnInit();
      event.target.complete();
    }, 2000);
  }

  async getReviews() {
    //retreiving the reviews of  counselor
    const counselorRef = collection(this.firestore, 'Reviews');
    const q = query(counselorRef, where('counselor', '==', this.name));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const obj = JSON.parse(JSON.stringify(doc.data()));
      this.fetchedreviews.push(obj);
    });
  }
}
