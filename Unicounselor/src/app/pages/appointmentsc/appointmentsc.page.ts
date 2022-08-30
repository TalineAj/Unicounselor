import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/apis/auth.service';
import { Appointment, AppointmentsService, Status } from 'src/app/apis/appointments.service';
import { collection, query, where, getDocs } from 'firebase/firestore';
import {Firestore} from '@angular/fire/firestore';
import { AlertController, LoadingController, ModalController, NavParams, ToastController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-appointmentsc',
  templateUrl: './appointmentsc.page.html',
  styleUrls: ['./appointmentsc.page.scss'],
})
export class AppointmentscPage implements OnInit {
  id: any;
  user: any;
  username = null;
  appointments =[];
  appointmentsids =[];
  status: Status;

  constructor(private alertController: AlertController , private authService: AuthService, private firestore: Firestore,
    private appointmentService: AppointmentsService , private loadingController: LoadingController,
     private toastController: ToastController) { }

    ngOnInit() {

    this.id =  this.authService.getCurrentUserId();
    if(this.id){
      //there is a signed in user
      this.authService.getUserById(this.id).subscribe(res =>{
        this.user = res;
        this.username = this.user.firstname + ' '+ this.user.lastname;
        console.log(this.username);
        this.getMeetings();
      });
    }else{
     console.log('no user signed in');
    }
  }
  async getMeetings(){
    const appointmentsRef =collection(this.firestore,'Appointments');
    //to only get counselors
    const q = query(appointmentsRef, where('counselor', '==', this.username), where('status', '==', 'pending'));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, ' =>' , doc.data());
      const obj = JSON.parse(JSON.stringify(doc.data()));
      const obj1 = JSON.parse(JSON.stringify(doc.id));
      // obj.id = doc.id;
      //obj.eventId = doc.id;
    this.appointmentsids.push(obj1);
    this.appointments.push(obj);
    console.log(this.appointments);
    console.log(this.appointmentsids);
  });
  }
//Alert and function when approved
async presentAlert(i: any) {
  const alert = await this.alertController.create({
    header: 'Approve',
    message:'Please confirm your approval',
    inputs: [
      {
        type: 'textarea',
        name: 'msg',
        placeholder: 'Enter your message',
      },
    ],
    buttons: [
      { text: 'Confirm', handler: (res)=>{
        // console.log(i + res.msg);
        this.approve(i,res.msg);
      }

      },
      {
        text: 'Cancel'
      }

    ],
  });

  await alert.present();


}
async approve(appointmentid: any, msg: any){
  const loading = await this.loadingController.create({
    message: `Approving appointment`,
  });
  await loading.present();
  const id = this.appointmentsids[appointmentid];
  // console.log(this.appointments[appointmentid].status);
  // console.log(this.appointments[appointmentid].status!=='pending');
  // if(this.appointments[appointmentid].status!=='pending'){
    // const toast1 = await this.toastController.create({
    // message: 'Please select a date ',
    // duration: 4000,
    // });
    // loading.dismiss();
    // await toast1.present();
    // return;
    // console.log('erreurr');
    // }else {
  this.status = {
   messagec: msg,
   status: 'Approved'
  };
   this.appointmentService.setStatus( this.status, id);
   const toast = await this.toastController.create({
    message: 'Appointment Successfully approved',
    duration: 4000,
  });
  loading.dismiss();
  await toast.present();

// }
 }
 //Alert and function when declined

 async presentAlert1(i: any) {
  const alert = await this.alertController.create({
    header: 'Decline',
    message:'Please confirm your declinature',
    inputs: [
      {
        type: 'textarea',
        name: 'msg',
        placeholder: 'Enter your message',
      },
    ],
    buttons: [
      { text: 'Confirm', handler: (res)=>{
        this.decline(i,res.msg);
      }

      },
      {
        text: 'Cancel'
      }

    ],
  });

  await alert.present();


}
async decline(appointmentid: any, msg: any){
  const loading = await this.loadingController.create({
  message: `Declining appointment`,
});
await loading.present();
  const id = this.appointmentsids[appointmentid];
  this.status = {
   messagec: msg,
   status: 'Declined'
  };
   this.appointmentService.setStatus( this.status, id);
   const toast = await this.toastController.create({
    message: 'Appointment Successfully declined',
    duration: 4000,
  });
  loading.dismiss();
  await toast.present();
 }













}
