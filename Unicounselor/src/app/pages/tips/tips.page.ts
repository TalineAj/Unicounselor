import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TipsService } from 'src/app/apis/tips.service';

@Component({
  selector: 'app-tips',
  templateUrl: './tips.page.html',
  styleUrls: ['./tips.page.scss'],
})
export class TipsPage implements OnInit {
  long: boolean;
  notips: any;
  tips: any[];
  constructor(private tipsService: TipsService, private route: Router) {}
  ngOnInit() {
    this.tipsService.getTips().subscribe((res) => {
      this.tips = res;
      this.notips = this.tips.length;
    });
  }
  check(tip: any) { //used for further customization for the page
    if (tip.length > 30) {
      this.long = true;
    } else {
      this.long = false;
    }
  }
  redirectToHome() {
    this.route.navigate(['/home']);
  }
  false() {
    this.long = false;
  }
}
