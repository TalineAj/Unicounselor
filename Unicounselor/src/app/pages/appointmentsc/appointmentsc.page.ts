import { Component, OnInit, ɵɵsetComponentScope } from '@angular/core';
import { AuthService } from 'src/app/apis/auth.service';
import { Appointment, AppointmentsService, Status } from 'src/app/apis/appointments.service';
import { collection, query, where, getDocs } from 'firebase/firestore';
import {Firestore} from '@angular/fire/firestore';
import { AlertController, LoadingController, ModalController, NavParams, ToastController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { CalenderAuthService } from 'src/app/apis/calender-auth.service';
import { CommonModule } from '@angular/common';

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
  conflict: boolean[] = [];
   events = [];
   conflictid: number[] = [];


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
        this.getEvents();
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
  if(this.conflict[appointmentid]===true){
//an appointment or event is already booked at that time , so it must be unbooked

//delete event from calender
//delete appointment from appointments
  }
  const loading = await this.loadingController.create({
    message: `Approving appointment`,
  });
  await loading.present();
  const id = this.appointmentsids[appointmentid];
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
console.log(new Date(element.date).toString());
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
  appointmentId: this.appointmentsids[appointmentid],
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



//Getting the calender appointments of the counselor

async getEvents() {
  //storing  the events of that particular logged in counselor in the events array to display on their calender
  const counselorRef = collection(this.firestore, 'Calender');
  const q = query(counselorRef, where('counselor', '==', this.username));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    // console.log(doc.id, ' =>' , doc.data());
    const event = JSON.parse(JSON.stringify(doc.data()));
    event.id = doc.id;
    event.startTime = new Date(event.startTime.seconds * 1000);
    event.endTime = new Date(event.endTime.seconds * 1000);
   this.events.push(event);
  });
  console.log(this.events);
  console.log(this.appointments);


  console.log(this.conflict);
  // eslint-disable-next-line @typescript-eslint/prefer-for-of
  for (let i = 0; i <this.appointments.length; i++) {
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let j = 0; j <this.events.length; j++) {
      if((this.events[j].startTime).getTime()===(new Date (this.appointments[i].date)).getTime())
    {
        this.conflict[i]= true;
        this.conflictid[i]= this.events[j].id;
        break;
    }
    else{
      this.conflict[i]= false;
    }
    }
  }




}


public resolution(){
 // eslint-disable-next-line @typescript-eslint/prefer-for-of
 for(let i = 0; i <this.conflictid.length; i++){

}

}





















}
