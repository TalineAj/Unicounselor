import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TipscPageRoutingModule } from './tipsc-routing.module';

import { TipscPage } from './tipsc.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TipscPageRoutingModule
  ],
  declarations: [TipscPage]
})
export class TipscPageModule {}
