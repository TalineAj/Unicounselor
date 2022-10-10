import { Component, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CalenderAuthService, Event } from 'src/app/apis/calender-auth.service';
import { NgForm } from '@angular/forms';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { AuthService } from 'src/app/apis/auth.service';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.page.html',
  styleUrls: ['./calender.page.scss'],
})
export class CalenderPage implements OnInit {
  id: any;
  user: any;
  username = null;
  eventSource =[];
calendar = {
    mode: 'month',
    currentDate: new Date(),
  };
  selectedDate = new Date();
  constructor( private toastController: ToastController, private loadingController: LoadingController, 
    private firestore: Firestore, private authService: AuthService, private calenderService: CalenderAuthService) {



  }
 async addNewEvent(form: NgForm) {
//Since the selectedDate chooses a random time
//I let the user choose a date using a form and then created a new date with the selected date from calender and time from form

const loading = await this.loadingController.create({
  message: `Adding event`,
});
await loading.present();
//Validation (no need for validation for selecteddate since it is never empty, it takes the date of the current day)
if(form.value.starttime==='' || form.value.endtime===''){
  console.log('entered'
  );
const toast1 = await this.toastController.create({
message: 'Please enter the start and end time',
duration: 4000,
});
loading.dismiss();
await toast1.present();
return;
}


//preparing the data
const start = new Date(this.selectedDate
      .getFullYear(), this.selectedDate
      .getMonth(), this.selectedDate
      .getDate(),form.value.starttime.split(':')[0],form.value.starttime.split(':')[1]);

    const end = new Date(this.selectedDate
      .getFullYear(), this.selectedDate
      .getMonth(), this.selectedDate
      .getDate(),form.value.endtime.split(':')[0],form.value.endtime.split(':')[1]);
//creating the event
    const event = {
      title: form.value.title,
      startTime: start,
      endTime: end,
      allDay: false,
      counselor: this.username,
      //counselor can be null but wont be since only logged in users can access the page
    };
    await this.calenderService.addEvent(event);
    await loading.dismiss();

    const toast = await this.toastController.create({
      message: 'Event Successfully submitted',
      duration: 4000,
    });
    loading.dismiss();
    form.reset();
    await toast.present();
  }




  onViewTitleChanged(title) {
    console.log(title);
  }
  onEventSelected(event) {
    console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
  }

  onTimeSelected(ev) {
    console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' +
      (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
    this.selectedDate = ev.selectedTime;

  }

   onCurrentDateChanged(event: Date) {
    console.log('current date change: ' + event);

  }


  onRangeChanged(ev) {
    console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
  }





 ngOnInit() {
    this.id =  this.authService.getCurrentUserId();
    if(this.id){
      //there is a signed in user
      this.authService.getUserById(this.id).subscribe(res =>{
        this.user = res;
        this.username = this.user.firstname + ' '+ this.user.lastname;
        console.log(this.username);
        this.getEvents();
      });
    }else{
     console.log('no user signed in');
    }

  }
  async getEvents(){
//storing  the events of that particular logged in counselor in the events array to display on their calender
const events = [];
const counselorRef =collection(this.firestore,'Calender');
const q = query(counselorRef, where('counselor', '==', this.username));
const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  // console.log(doc.id, ' =>' , doc.data());
  const event = JSON.parse(JSON.stringify(doc.data()));
  event.id = doc.id;
 event.startTime = new Date(event.startTime.seconds*1000);
  event.endTime = new Date(event.endTime.seconds*1000);

  events.push(event);
  this.eventSource = events;
});
//   this.calenderService.getEvent().subscribe( res => {
//       this.eventSource = res;
// });

// console.log(this.eventSource);
  }


}
