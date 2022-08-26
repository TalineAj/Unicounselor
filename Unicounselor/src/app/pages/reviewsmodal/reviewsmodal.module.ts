import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReviewsmodalPageRoutingModule } from './reviewsmodal-routing.module';

import { ReviewsmodalPage } from './reviewsmodal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReviewsmodalPageRoutingModule
  ],
  declarations: [ReviewsmodalPage]
})
export class ReviewsmodalPageModule {}
