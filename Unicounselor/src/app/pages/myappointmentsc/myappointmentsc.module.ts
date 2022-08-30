import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyappointmentscPageRoutingModule } from './myappointmentsc-routing.module';

import { MyappointmentscPage } from './myappointmentsc.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyappointmentscPageRoutingModule
  ],
  declarations: [MyappointmentscPage]
})
export class MyappointmentscPageModule {}
