import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController, NavParams } from '@ionic/angular';
import {
  AlertController,
  LoadingController,
  ToastController,
} from '@ionic/angular';
import {
  Appointment,
  AppointmentsService,
} from 'src/app/apis/appointments.service';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  firstname: any;
  lastname: any;
  field: any;
  appointment: Appointment;
  studentname: any;
  image: any;
  imagec: any;
  constructor(
    private navParams: NavParams,
    private modalController: ModalController,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private route: Router,
    private toastController: ToastController,
    private appointmentService: AppointmentsService
  ) {}

  ngOnInit() {
    this.firstname = this.navParams.get('fname');
    this.lastname = this.navParams.get('lname');
    this.field = this.navParams.get('field');
    this.studentname = this.navParams.get('student');
    this.image = this.navParams.get('image'); //In order  for the image of the student
    // to be stored so that the counselor can see the image of the booking student
    this.imagec = this.navParams.get('counselorimage');
  }
  closeModal() {
    this.modalController.dismiss();
  }
  async onSubmit(form: NgForm) {
    console.log(form);
    const loading = await this.loadingController.create({
      message: `Requesting appointment`,
    });
    await loading.present();
    if (form.value.date === '') {
      const toast1 = await this.toastController.create({
        message: 'Please select a date ',
        duration: 4000,
      });
      loading.dismiss();
      await toast1.present();
      return;
    }
    this.appointment = {
      student: this.studentname,
      date: form.value.date,
      counselor: this.firstname + ' ' + this.lastname,
      message: form.value.message,
      status: 'Pending',
      profileImage: this.image,
      profileImagec: this.imagec,
    };

    const appointmentbooked = await this.appointmentService.addAppointment(
      this.appointment
    );
    await loading.dismiss();

    const toast = await this.toastController.create({
      // eslint-disable-next-line max-len
      message: 'Appointment Successfully requested',
      duration: 3000,
    });
    form.reset();
    loading.dismiss();
    await toast.present();
  }
}
