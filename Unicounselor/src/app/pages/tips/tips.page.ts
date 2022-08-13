import { Component, OnInit } from '@angular/core';
import { TipsService } from 'src/app/apis/tips.service';

@Component({
  selector: 'app-tips',
  templateUrl: './tips.page.html',
  styleUrls: ['./tips.page.scss'],
})
export class TipsPage implements OnInit {

  notips: any;
  tips: any[];
  constructor(private tipsService: TipsService) {

  }

  ngOnInit() {
    this.tipsService.getTips().subscribe( res => {
      this.tips = res;
      this.notips = this.tips.length;
  //subbsribe to wait for the result to be returned
});
  }

}
