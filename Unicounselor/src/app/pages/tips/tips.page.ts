import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TipsService } from 'src/app/apis/tips.service';
import { AuthService } from 'src/app/apis/auth.service';

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
    private authService: AuthService) {

  }
  ngOnInit() {
    this.tipsService.getTips().subscribe( res => {
      this.tips = res;
      this.notips = this.tips.length;
console.log(this.tips);
  //subbsribe to wait for the result to be returned
});
//PROBLEM returning undefiend as userid;
// const user = this.authService.getCurrentUser();
// console.log(user+' ');

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
