import { Component, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CalenderAuthService, Event } from 'src/app/apis/calender-auth.service';
import { NgForm } from '@angular/forms';
import { collection, query, where, getDocs } from 'firebase/firestore';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.page.html',
  styleUrls: ['./calender.page.scss'],
})
export class CalenderPage implements OnInit {

  eventSource =[];
calendar = {
    mode: 'month',
    currentDate: new Date(),
  };
  selectedDate = new Date();
  constructor(private firestore: Firestore, private calenderService: CalenderAuthService) {



  }
  addNewEvent(form: NgForm) {

    const start = new Date(this.selectedDate
      .getFullYear(), this.selectedDate
      .getMonth(), this.selectedDate
      .getDate(),form.value.starttime.split(':')[0],form.value.starttime.split(':')[1]);

    const end = new Date(this.selectedDate
      .getFullYear(), this.selectedDate
      .getMonth(), this.selectedDate
      .getDate(),form.value.endtime.split(':')[0],form.value.endtime.split(':')[1]);

    const event = {
      title: 'Event #',
      startTime: start,
      endTime: end,
      allDay: false,
    };
    this.calenderService.addEvent(event);
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





  async ngOnInit() {
    const events = [];
    const counselorRef =collection(this.firestore,'Calender');
    const q = query(counselorRef);
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
