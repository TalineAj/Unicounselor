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
  student: any;
  appointment: Appointment;
  id: any;
  user: any;

  constructor(private navParams: NavParams, private modalController: ModalController, private alertController: AlertController,
    private loadingController: LoadingController,
    private toastController: ToastController, private appointmentService: AppointmentsService, private authService: AuthService) { }

  ngOnInit() {
  this.firstname = this.navParams.get('fname');
  this.lastname = this.navParams.get('lname');
  this.field = this.navParams.get('field');
  this.id =  this.authService.getCurrentUserId();
if(this.id){
  //there is a signed in user
  this.authService.getUserById(this.id).subscribe(res =>{
    this.user = res;
    this.student = this.user.firstname + ' '+ this.user.lastname;
  });
}else{
 console.log('no user signed in');
}
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
  student: this.student,
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
