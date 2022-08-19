import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyinformationPageRoutingModule } from './myinformation-routing.module';

import { MyinformationPage } from './myinformation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyinformationPageRoutingModule
  ],
  declarations: [MyinformationPage]
})
export class MyinformationPageModule {}
