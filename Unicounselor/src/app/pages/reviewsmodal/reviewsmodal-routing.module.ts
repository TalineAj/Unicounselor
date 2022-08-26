import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReviewsmodalPage } from './reviewsmodal.page';

const routes: Routes = [
  {
    path: '',
    component: ReviewsmodalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReviewsmodalPageRoutingModule {}
