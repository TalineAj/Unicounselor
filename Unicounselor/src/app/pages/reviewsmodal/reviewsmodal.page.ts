import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import {
  AlertController,
  LoadingController,
  ToastController,
} from '@ionic/angular';
import { Appointment, AppointmentsService } from 'src/app/apis/appointments.service';
import { AuthService } from 'src/app/apis/auth.service';

@Component({
  selector: 'app-reviewsmodal',
  templateUrl: './reviewsmodal.page.html',
  styleUrls: ['./reviewsmodal.page.scss'],
})
export class ReviewsmodalPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
