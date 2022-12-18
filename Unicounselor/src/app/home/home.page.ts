import { Component, Query } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../apis/auth.service';
import { TipsService, Tip } from '../apis/tips.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  today = new Date().toLocaleDateString();
  id: any;
  user: any;
  name: any;
  notips: any;
  tips: any[];
  tiptoDisplay: any[];

  constructor(
    private route: Router,
    private authService: AuthService,
    private tipsService: TipsService
  ) {
    this.id = this.authService.getCurrentUserId();
    if (this.id) {
      //there is a signed in user
      this.authService.getUserById(this.id).subscribe((res) => {
        this.user = res;
        this.name = this.user.firstname; //getting the name of user to display it
      });
    } else {
      console.log('no user signed in');
    }
    ///tips
    this.tipsService.getTips().subscribe((res) => { //getting tips to display on homepage
      this.tips = res;
      this.notips = this.tips.length; //checking if there are tips written by counselor or not yet, if not, default tips appear
      this.tiptoDisplay = this.tips.slice(0, 2);
    });
  }

}
