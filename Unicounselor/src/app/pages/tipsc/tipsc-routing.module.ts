import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TipscPage } from './tipsc.page';

const routes: Routes = [
  {
    path: '',
    component: TipscPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TipscPageRoutingModule {}
