import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/apis/auth.service';
import { Appointment, AppointmentsService, Status } from 'src/app/apis/appointments.service';
import { collection, query, where, getDocs } from 'firebase/firestore';
import {Firestore} from '@angular/fire/firestore';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-myappointmentsc',
  templateUrl: './myappointmentsc.page.html',
  styleUrls: ['./myappointmentsc.page.scss'],
})
export class MyappointmentscPage implements OnInit {
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
    const q = query(appointmentsRef, where('counselor', '==', this.username), where('status', '==', 'Approved'));
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
  this.status = {
   messagec: msg,
   status: 'Cancelled'
  };
   this.appointmentService.setStatus( this.status, id);
   const toast = await this.toastController.create({
    message: 'Appointment Successfully cancelled',
    duration: 4000,
  });
  loading.dismiss();
  await toast.present();

// }
 }
}
