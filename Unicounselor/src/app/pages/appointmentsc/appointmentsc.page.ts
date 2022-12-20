//Given the amount of code and work the console.log statement were left commented
//In case of any future imporvements it would be easier to uncomment the useful logs.
import { Component, OnInit, ɵɵsetComponentScope } from '@angular/core';
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
  ModalController,
  NavParams,
  ToastController,
} from '@ionic/angular';
import { CalenderAuthService } from 'src/app/apis/calender-auth.service';
import { timer } from 'rxjs';

@Component({
  selector: 'app-appointmentsc',
  templateUrl: './appointmentsc.page.html',
  styleUrls: ['./appointmentsc.page.scss'],
})
export class AppointmentscPage implements OnInit {
  id: any;
  user: any;
  username = null;
  noappointments = 0;
  appointments = [];
  appointmentsids = [];
  status: Status;
  conflict: boolean[] = [];
  events = [];
  eventsids = [];
  conflictid: number[] = [];
  isAppointment: boolean;
  conflictingEvent: any;
  conflictingEventid: any;
  time = 10; //for lazy loading

  constructor(
    private alertController: AlertController,
    private authService: AuthService,
    private firestore: Firestore,
    private appointmentService: AppointmentsService,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private calenderService: CalenderAuthService
  ) {}

  ngOnInit() {
    timer(2000).subscribe(() => (this.time = -1)); //Average waiting time for an image to load on normal internet would be 2 seconds
    this.id = this.authService.getCurrentUserId();
    if (this.id) {
      //there is a signed in user
      this.authService.getUserById(this.id).subscribe((res) => {
        this.user = res;
        this.username = this.user.firstname + ' ' + this.user.lastname;
        console.log(this.username);
        this.getMeetings();
        this.getEvents();
      });
    } else {
      console.log('no user signed in');
    }
  }

  async getMeetings() {
    this.noappointments = 0;

    const appointmentsRef = collection(this.firestore, 'Appointments');
    //to only get appointments of that counselor that are pending
    const q = query(
      appointmentsRef,
      where('counselor', '==', this.username),
      where('status', '==', 'Pending')
    );
    const querySnapshot = await getDocs(q);
    //console.log(this.noappointments);
    querySnapshot.forEach((doc) => {
      //if the query does not return anything it doesnt enter here thats why we set it inside to 1
      this.noappointments = 1;
      const obj = JSON.parse(JSON.stringify(doc.data()));
      const obj1 = JSON.parse(JSON.stringify(doc.id));
      this.appointmentsids.push(obj1);
      this.appointments.push(obj);
    });
  }
  resetAppointments() {
    //removing the appointments in array and fetching them again
    length = this.appointments.length;
    for (let i = 0; i <= length; i++) {
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
  }
  //Alert and function when approved
  async presentAlert(i: any) {
    const alert = await this.alertController.create({
      header: 'Approve',
      cssClass: 'app-alert',
      message: 'Please confirm your approval',
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
            this.approve(i, res.msg);
          },
        },
        {
          text: 'Cancel',
        },
      ],
    });

    await alert.present();
  }
  async approve(appointmentid: any, msg: any) {
    if (this.conflict[appointmentid] === true) {
      //Checking if this appointment has a conflict, if yes then resolve it
      this.resolution(
        this.isAppointment,
        this.conflictingEvent,
        this.conflictingEventid
      );
      //an appointment or event is already booked at that time , so it must be unbooked
      //delete event from calender
      //delete appointment from appointments and from calender
    }
    const loading = await this.loadingController.create({
      message: `Approving appointment`,
    });
    await loading.present();
    const id = this.appointmentsids[appointmentid];
    this.status = {
      messagec: msg,
      status: 'Approved',
    };
    this.appointmentService.setStatus(this.status, id);
    const toast = await this.toastController.create({
      message: 'Appointment Successfully approved',
      duration: 3000,
    });
    loading.dismiss();
    await toast.present();
    //To add the confirmed appointment to the
    //couselor's calender
    this.addNewEvent(appointmentid);
    setTimeout(() => {
      this.resetAppointments();
    }, 1000);
  }
  addMinutes(date, minutes) {
    return new Date(date.getTime() + minutes * 60000);
  }

  async addNewEvent(appointmentid: any) {
    const element = this.appointments[appointmentid]; //Getting the appointment
    // console.log(new Date(element.date).toString());
    //Transorming the datetime local format to new Date format since this is what is stored in calender
    const year = element.date.split('-')[0];
    const month = element.date.split('-')[1] - 1;
    const day = element.date.split('-')[2].split('T')[0];
    const hours = element.date.split('-')[2].split('T')[1].split(':')[0];
    const minutes = element.date.split('-')[2].split('T')[1].split(':')[1];
    const date = new Date(year, month, day, hours, minutes);
    // const end = new Date( year,month,day,hours,minutes+30);
    const end = this.addMinutes(date, 30);
    //Assuming each appointment is 30 minutes
    const event = {
      title: 'Appointment with' + ' ' + element.student,
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
      message: 'Please confirm your declinature',
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
            this.decline(i, res.msg);
          },
        },
        {
          text: 'Cancel',
        },
      ],
    });

    await alert.present();
  }
  async decline(appointmentid: any, msg: any) {
    const loading = await this.loadingController.create({
      message: `Declining appointment`,
    });
    await loading.present();
    const id = this.appointmentsids[appointmentid];
    this.status = {
      messagec: msg,
      status: 'Declined',
    };
    this.appointmentService.setStatus(this.status, id);
    const toast = await this.toastController.create({
      message: 'Appointment Successfully declined',
      duration: 3000,
    });
    loading.dismiss();
    await toast.present();
    setTimeout(() => {
      this.resetAppointments();
    }, 1000);
  }

  //Getting the calender events of the counselor
  //in this method also we are checking if there is a conflict and storing relevant
  //information for checking for conflict as well as resolution
  async getEvents() {
    const counselorRef = collection(this.firestore, 'Calender');
    const q = query(counselorRef, where('counselor', '==', this.username));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const event = JSON.parse(JSON.stringify(doc.data()));
      event.id = doc.id;
      const eventid = JSON.parse(JSON.stringify(doc.id));
      event.startTime = new Date(event.startTime.seconds * 1000); //Transforming time to format that can be useful
      event.endTime = new Date(event.endTime.seconds * 1000);
      this.events.push(event); //Getting the events of the calender
      this.eventsids.push(eventid); //Getting the ids of the events
    });

    // console.log(this.events);
    //console.log(this.appointments);

    //console.log(this.conflict);
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < this.appointments.length; i++) {
      // eslint-disable-next-line @typescript-eslint/prefer-for-of
      for (let j = 0; j < this.events.length; j++) {
        const endofAppointment = this.addMinutes(
          new Date(this.appointments[i].date),
          30
        );
        //  console.log( this.events[j].startTime.getTime());
        //looping in the requested appointments array and compareing each element with the event array events to determine any conflict
        if (
          //Cheking if the requested appointment starts the same time as another event/appointment
          // or if the start or end of appointment requested is between start and end of a certain event/appointment
          this.events[j].startTime.getTime() ===
            new Date(this.appointments[i].date).getTime() ||
          (this.events[j].startTime.getTime() <
            new Date(this.appointments[i].date).getTime() &&
            new Date(this.appointments[i].date).getTime() <
              this.events[j].endTime.getTime()) ||
          (this.events[j].startTime.getTime() < endofAppointment &&
            endofAppointment < this.events[j].endTime.getTime())
        ) {
          //storing true in the conflict array at i , the index of the appointments array
          this.conflict[i] = true;
          this.conflictid[i] = this.events[j];
          this.conflictingEvent = this.events[j];
          this.conflictingEventid = this.eventsids[j];
          if (this.conflictingEvent.appointmentId === undefined) {
            //Checking if the conflicting event is an event or an appointment event
            this.isAppointment = false;
          } else {
            this.isAppointment = true;
          }
          break;
        } else {
          this.conflict[i] = false;
        }
      }
    }
  }

  public resolution(isAppointment: boolean, event: any, eventid: any) {
    console.log('resolution');
    //could have only used one param but its more tidy this way
    if (isAppointment === true) {
      //Delete event and cancel appointment
      this.deleteAppintmentEvent(event.appointmentId);
      //cancelling the conflicting appointment
      this.cancel(event.appointmentId);
    } else {
      //Delete event
      this.deleteEvent(event, eventid);
    }
  }

  //Delete the conflicting appointment event
  async deleteAppintmentEvent(id: number) {
    //console.log('deleteappointmentEvent');

    //console.log('Deleting conflicting appointment event');

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

  //Cancelling the conflicing appointment
  async cancel(appointmentid: any) {
    //console.log('cancel appointment');

    this.status = {
      messagec: 'Conflicts with an appointment I have',
      status: 'Cancelled',
    };
    this.appointmentService.setStatus(this.status, appointmentid);
  }

  //Deleting the conflicting event
  async deleteEvent(event: any, id: any) {
    //console.log('deleteEvent');

    this.calenderService.deleteEvent(event, id); //deletes that event
  }
}
