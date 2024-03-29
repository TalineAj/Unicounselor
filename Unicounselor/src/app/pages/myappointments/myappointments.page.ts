import { Component, OnInit } from '@angular/core';
import {
  AppointmentsService,
  Status,
  Statusstudent,
} from 'src/app/apis/appointments.service';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Firestore } from '@angular/fire/firestore';
import {
  AlertController,
  LoadingController,
  ModalController,
  NavParams,
  ToastController,
} from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
import { AuthService } from 'src/app/apis/auth.service';
import { ActivatedRoute } from '@angular/router';
import { CalenderAuthService } from 'src/app/apis/calender-auth.service';
import { timer } from 'rxjs';

@Component({
  selector: 'app-myappointments',
  templateUrl: './myappointments.page.html',
  styleUrls: ['./myappointments.page.scss'],
})
export class MyappointmentsPage implements OnInit {
  id: any;
  username = null;
  appointments = [];
  noappointments = 0;
  appointmentsids = [];
  status: Statusstudent;
  time = 10; //for lazy loading

  constructor(
    private firestore: Firestore,
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController,
    private authService: AuthService,
    private appointmentService: AppointmentsService,
    private calenderService: CalenderAuthService,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) {
  }
  async ngOnInit() {

    timer(2000).subscribe(() => (this.time = -1)); //Average waiting time for an image to load on normal internet would be 2 seconds
    this.username = this.activatedRoute.snapshot.paramMap.get('myusername');
    this.noappointments = 0;
    const appointmentsRef = collection(this.firestore, 'Appointments');
    //to only get counselors
    const q = query(appointmentsRef, where('student', '==', this.username));
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
    const id = this.appointmentsids[appointmentid]; //Getting the selected appointment id
    this.status = {
      message: msg,
      status: 'Cancelled',
    };
    this.appointmentService.setStatusstudent(this.status, id);
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
