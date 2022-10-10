import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/apis/auth.service';
import { Appointment, AppointmentsService, Status } from 'src/app/apis/appointments.service';
import { collection, query, where, getDocs } from 'firebase/firestore';
import {Firestore} from '@angular/fire/firestore';
import { AlertController, LoadingController, ModalController, NavParams, ToastController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { CalenderAuthService } from 'src/app/apis/calender-auth.service';

@Component({
  selector: 'app-appointmentsc',
  templateUrl: './appointmentsc.page.html',
  styleUrls: ['./appointmentsc.page.scss'],
})
export class AppointmentscPage implements OnInit {
  id: any;
  user: any;
  username = null;
  noappointments= 0 ;
  appointments =[];
  appointmentsids =[];
  status: Status;

  constructor(private alertController: AlertController , private authService: AuthService, private firestore: Firestore,
    private appointmentService: AppointmentsService , private loadingController: LoadingController,
     private toastController: ToastController,  private calenderService: CalenderAuthService) { }

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
    const q = query(appointmentsRef, where('counselor', '==', this.username), where('status', '==', 'Pending'));
    const querySnapshot = await getDocs(q);
    console.log(this.noappointments);
    querySnapshot.forEach((doc) => {
      //if the query does not return anything it doesnt enter here thats why we set it inside to 1
      this.noappointments = 1 ;
      // doc.data() is never undefined for query doc snapshots
      const obj = JSON.parse(JSON.stringify(doc.data()));
      const obj1 = JSON.parse(JSON.stringify(doc.id));
    this.appointmentsids.push(obj1);
    this.appointments.push(obj);


  });


  }


//Alert and function when approved
async presentAlert(i: any) {
  const alert = await this.alertController.create({
    header: 'Approve',
    cssClass: 'app-alert',
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
    duration: 3000,
  });
  loading.dismiss();
  await toast.present();
  //To add the confirmed appointment to the
  //couselor's calender
  this.addNewEvent(appointmentid);
// }
 }
async addNewEvent(appointmentid: any){
const element = this.appointments[appointmentid]; //Getting the appointment

//Transorming the datetime local format to new Date format since this is what is stored in calender
const year = element.date.split('-')[0];
const month = (element.date.split('-')[1])-1;//FIX THIS ISSUE THERE SHOULD BE ANOTHER FIX
const day =(element.date.split('-')[2]).split('T')[0];
const hours = (((element.date.split('-')[2]).split('T')[1]).split(':')[0]);
const minutes = ((element.date.split('-')[2]).split('T')[1]).split(':')[1];
const date = new Date(year,month,day,hours,minutes);
const end = new Date( year,month,day,hours,minutes+30);
//Assuming each appointment is 60 minutes
const event = {
  title: 'Appointment with'+' '+ element.student,
  startTime: date,
  endTime: end,
  allDay: false,
  counselor: this.username,
};
await this.calenderService.addEvent(event);


}
















 //Alert and function when declined

 async presentAlert1(i: any) {
  const alert = await this.alertController.create({
    header: 'Decline',
    cssClass: 'app-alert',
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
    duration: 3000,
  });
  loading.dismiss();
  await toast.present();
 }













}
