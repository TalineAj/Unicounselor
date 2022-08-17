import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/apis/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
    console.log('heyi');
//   const res = this.authService.getCurrentUser();
// console.log(res);






// this.authService.getCurrentUser();
  }


}
