import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/apis/auth.service';
import {
  Appointment,
  AppointmentsService,
  Status,
} from 'src/app/apis/appointments.service';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Firestore } from '@angular/fire/firestore';
import {
  AlertController,
  LoadingController,
  ToastController,
} from '@ionic/angular';
import { CalenderAuthService } from 'src/app/apis/calender-auth.service';
import { timer } from 'rxjs';

@Component({
  selector: 'app-myappointmentsc',
  templateUrl: './myappointmentsc.page.html',
  styleUrls: ['./myappointmentsc.page.scss'],
})
export class MyappointmentscPage implements OnInit {
  id: any;
  user: any;
  username = null;
  noappointments = 0;
  appointments = [];
  appointmentsids = [];
  status: Status;
    time = 10; //for lazy loading

  images = [];
  constructor(
    private alertController: AlertController,
    private authService: AuthService,
    private firestore: Firestore,
    private appointmentService: AppointmentsService,
    private loadingController: LoadingController,
    private calenderService: CalenderAuthService,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    timer(2000).subscribe(() => (this.time = -1)); //Average waiting time for an image to load on normal internet would be 2 seconds
    this.id = this.authService.getCurrentUserId();
    if (this.id) {
      //there is a signed in user
      this.authService.getUserById(this.id).subscribe((res) => {
        this.user = res;
        this.username = this.user.firstname + ' ' + this.user.lastname;
        this.getMeetings();
      });
    } else {
      console.log('no user signed in');
    }
  }

  async getMeetings() {
   this.noappointments = 0;
    const appointmentsRef = collection(this.firestore, 'Appointments');
    //to only get the approved meetings of this conselor
    const q = query(
      appointmentsRef,
      where('counselor', '==', this.username),
      where('status', '==', 'Approved')
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      //if the query does not return anything it doesnt enter here thats why we set it inside to 1
      this.noappointments = 1;
      const obj = JSON.parse(JSON.stringify(doc.data()));
      const obj1 = JSON.parse(JSON.stringify(doc.id));
      this.appointmentsids.push(obj1);
      this.appointments.push(obj);
    });
  }
  resetAppointments(){
    length = this.appointments.length;
    for(let i =0; i<=length;i++){
      this.appointments.pop();
    }
    this.ngOnInit();
  }
  handleRefresh(event) {
    setTimeout(() => {
    //After refreshing page, the appointments array is reset
    //and the updated appointments in database are fetched
    this.resetAppointments();
      event.target.complete();
    }, 2000);
  };
  //Alert and function when cancelled
  async presentAlert(i: any) {
    const alert = await this.alertController.create({
      header: 'Cancel',
      cssClass: 'app-alert',
      message: 'Please confirm your cancellation',
      inputs: [
        {
          type: 'textarea',
          name: 'msg',
          placeholder: 'Enter your message',
        },
      ],
      buttons: [
        {
          text: 'Confirm',
          handler: (res) => {
            this.cancel(i, res.msg);
          },
        },
        {
          text: 'Cancel',
        },
      ],
    });

    await alert.present();
  }
  async cancel(appointmentid: any, msg: any) {
    const loading = await this.loadingController.create({
      message: `Cancelling appointment`,
    });
    await loading.present();
    const id = this.appointmentsids[appointmentid];
    this.status = {
      messagec: msg,
      status: 'Cancelled',
    };
    this.appointmentService.setStatus(this.status, id);
    const toast = await this.toastController.create({
      message: 'Appointment Successfully cancelled',
      duration: 4000,
    });
    loading.dismiss();
    await toast.present();
    this.deleteEvent(this.appointmentsids[appointmentid]);
      //After deleting event, the appointments array is reset
    //and the updated appointments in database are fetched
    setTimeout(() => {
    this.resetAppointments();
  }, 1000);
  }
  async deleteEvent(id: number) {
    //Getting the event we want to delete by looking at the appointmentid of that event if it matches the cancelled appointment id
    const calenderRef = collection(this.firestore, 'Calender');
    const q = query(calenderRef, where('appointmentId', '==', id));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const obj = JSON.parse(JSON.stringify(doc.data())); //this returns the appointment event
      //doc.id returns the id of the event
      this.calenderService.deleteEvent(obj, doc.id); //deletes that appointment event
    });
  }
}
