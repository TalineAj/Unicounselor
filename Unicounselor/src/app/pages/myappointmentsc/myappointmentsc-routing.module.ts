import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyappointmentscPage } from './myappointmentsc.page';

const routes: Routes = [
  {
    path: '',
    component: MyappointmentscPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyappointmentscPageRoutingModule {}
