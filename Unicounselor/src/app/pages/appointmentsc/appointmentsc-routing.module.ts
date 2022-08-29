import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppointmentscPage } from './appointmentsc.page';

const routes: Routes = [
  {
    path: '',
    component: AppointmentscPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppointmentscPageRoutingModule {}
