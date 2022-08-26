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
  constructor(private navParams: NavParams, private modalController: ModalController, private alertController: AlertController,
    private loadingController: LoadingController,
    private toastController: ToastController, private appointmentService: AppointmentsService) { }

  ngOnInit() {
  this.firstname = this.navParams.get('fname');
  this.lastname = this.navParams.get('lname');
  this.field = this.navParams.get('field');
  this.studentname = this.navParams.get('student');
  }
closeModal(){
  this.modalController.dismiss();
}
async onSubmit(form: NgForm) {
  const loading = await this.loadingController.create({
    message: `Requesting appointment`,
  });
  await loading.present();
//Also make sure the date  is valid FOR LATER
if(form.value.date===''){
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
  counselor: this.firstname + ' '+ this.lastname,
  message: form.value.message,
};

  const appointmentbooked = await this.appointmentService.addAppointment(this.appointment);
  await loading.dismiss();

  const toast = await this.toastController.create({
    // eslint-disable-next-line max-len
    message: 'Appointment Successfully requested',
    duration: 5000,
  });
  loading.dismiss();
  await toast.present();





//   if(){
//Check if it worked
//   }
//   else{
//     const alert = await this.alertController.create({
//             message: 'Booking unsuccessful',
//             buttons: ['Close'],
//           });
//           await alert.present();
//         }
  }
}
