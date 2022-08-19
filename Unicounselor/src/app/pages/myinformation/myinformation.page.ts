import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/apis/auth.service';

@Component({
  selector: 'app-myinformation',
  templateUrl: './myinformation.page.html',
  styleUrls: ['./myinformation.page.scss'],
})
export class MyinformationPage implements OnInit {
  id: any;

  constructor(private authService: AuthService) { }
  ngOnInit() {
     this.id =  this.authService.getCurrentUserId();
    this.authService.getUserById(this.id).subscribe(res =>{
console.log(res);
    });
  }

}
