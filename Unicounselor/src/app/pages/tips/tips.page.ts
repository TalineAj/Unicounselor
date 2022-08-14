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
  constructor(private tipsService: TipsService,
    private route: Router) {

  }

  ngOnInit() {
    this.tipsService.getTips().subscribe( res => {
      this.tips = res;
      this.notips = this.tips.length;
      if(this.tips[3].tip.length >20)
      {
        this.long = true;
      }else
      {
        this.long=false;
      }
  //subbsribe to wait for the result to be returned
});



  }
  redirectToHome(){
    this.route.navigate(['/home']);
  }


}
