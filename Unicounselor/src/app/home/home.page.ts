import { Component } from '@angular/core';
import { Router } from '@angular/router';

// import {LoginService} from '../apis/login.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor( private route: Router) {
//     this.dataService.getNotes().subscribe( res => {
// console.log(res);
//     });
  }
  //testing

  redirect()
  {
    this.route.navigate(['/login']);
  }
}
