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
    private route: Router,
   ) {

  }
  ngOnInit() {

    this.tipsService.getTips().subscribe( res => {
      this.tips = res;
      this.notips = this.tips.length;
});
//test
//     const id = '0YFTg7vFb54K1elZb3Ys';
// this.tipsService.getTipById(id).subscribe( res => {
// console.log(res);
// });


  }
        check(tip: any){
        // eslint-disable-next-line @typescript-eslint/prefer-for-of
        // for(let i =0 ; i<this.tips.length;i++){
          if(tip.length >30)
          {
            this.long = true;
          }else
          {
            this.long=false;
          }
          console.log(this.long);
        // }
      }
  redirectToHome(){
    this.route.navigate(['/home']);
  }
  false(){
    this.long=false;
  }


}
