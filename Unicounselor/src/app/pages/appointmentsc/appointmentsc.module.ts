import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AppointmentscPageRoutingModule } from './appointmentsc-routing.module';

import { AppointmentscPage } from './appointmentsc.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AppointmentscPageRoutingModule
  ],
  declarations: [AppointmentscPage]
})
export class AppointmentscPageModule {}
