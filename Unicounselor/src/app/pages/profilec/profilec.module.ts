import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilecPageRoutingModule } from './profilec-routing.module';

import { ProfilecPage } from './profilec.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilecPageRoutingModule
  ],
  declarations: [ProfilecPage]
})
export class ProfilecPageModule {}
