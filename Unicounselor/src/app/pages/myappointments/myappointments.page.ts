import { Component, OnInit } from '@angular/core';
import { AppointmentsService, Status, Statusstudent } from 'src/app/apis/appointments.service';
import { collection, query, where, getDocs } from 'firebase/firestore';
import {Firestore} from '@angular/fire/firestore';
import { AlertController, LoadingController, ModalController, NavParams, ToastController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
import { AuthService } from 'src/app/apis/auth.service';
import { ActivatedRoute } from '@angular/router';
import { CalenderAuthService } from 'src/app/apis/calender-auth.service';
import {timer} from 'rxjs';

@Component({
  selector: 'app-myappointments',
  templateUrl: './myappointments.page.html',
  styleUrls: ['./myappointments.page.scss'],
})
export class MyappointmentsPage implements OnInit {
  id: any;
  username = null;
  appointments =[];
  noappointments= 0 ;
  appointmentsids =[];
  status: Statusstudent;
  time =10; //for lazy loading


  constructor(private firestore: Firestore,
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController , private authService: AuthService,
    private appointmentService: AppointmentsService ,  private calenderService: CalenderAuthService,
    private loadingController: LoadingController,
     private toastController: ToastController) { }
async  ngOnInit() {
  timer(2000).subscribe(() => (this.time = -1));
this.username = this.activatedRoute.snapshot.paramMap.get('myusername');

  const appointmentsRef =collection(this.firestore,'Appointments');
  //to only get counselors
  const q = query(appointmentsRef, where('student', '==', this.username));
  const querySnapshot = await getDocs(q);
  console.log(this.username);
  console.log(this.noappointments);
  querySnapshot.forEach((doc) => {
    //if the query does not return anything it doesnt enter here thats why we set it inside to 1
    this.noappointments = 1 ;

    // doc.data() is never undefined for query doc snapshots
    // console.log(doc.id, ' =>' , doc.data());
    const obj = JSON.parse(JSON.stringify(doc.data()));
    const obj1 = JSON.parse(JSON.stringify(doc.id));
    // obj.id = doc.id;
    //obj.eventId = doc.id;
  this.appointmentsids.push(obj1);
    // obj.id = doc.id;
    //obj.eventId = doc.id;
  this.appointments.push(obj);
  console.log(this.appointments);
  console.log(this.appointments[0].profileImage);
  });


}
//Alert and function when cancelled
async presentAlert(i: any) {
  const alert = await this.alertController.create({
    header: 'Cancel',
    cssClass: 'app-alert',
    message:'Please confirm your cancellation',
    inputs: [
      {
        type: 'textarea',
        name: 'msg',
        placeholder: 'Enter your message',
      },
    ],
    buttons: [
      { text: 'Confirm', handler: (res)=>{
        this.cancel(i,res.msg);
      }

      },
      {
        text: 'Cancel'
      }

    ],
  });

  await alert.present();


}
async cancel(appointmentid: any, msg: any){
  const loading = await this.loadingController.create({
    message: `Cancelling appointment`,
  });
  await loading.present();
  const id = this.appointmentsids[appointmentid];
  this.status= {
   message: msg,
   status: 'Cancelled'
  };
   this.appointmentService.setStatusstudent( this.status, id);
   const toast = await this.toastController.create({
    message: 'Appointment Successfully cancelled',
    duration: 4000,
  });
  loading.dismiss();
  await toast.present();
  this.deleteEvent(this.appointmentsids[appointmentid]);
 }

 async deleteEvent(id: number){
  //Getting the event we want to delete by looking at the appointmentid of that event if it matches the cancelled appointment id
   const calenderRef =collection(this.firestore,'Calender');
   const q = query(calenderRef, where('appointmentId', '==', id));
   const querySnapshot = await getDocs(q);
   querySnapshot.forEach((doc) => {
     const obj = JSON.parse(JSON.stringify(doc.data()));//this returns the appointment event
     //doc.id returns the id of the event
     this.calenderService.deleteEvent(obj,doc.id);//deletes that appointment event
 });
 }





}
