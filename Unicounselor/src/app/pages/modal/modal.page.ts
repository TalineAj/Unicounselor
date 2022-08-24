import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  firstname: any;
  lastname: any;
  field: any;
  constructor(private navParams: NavParams, private modalController: ModalController) { }

  ngOnInit() {
  this.firstname = this.navParams.get('fname');
  this.lastname = this.navParams.get('lname');
  this.field = this.navParams.get('field');
  }
closeModal(){
  this.modalController.dismiss();
}
book(){


}
}
