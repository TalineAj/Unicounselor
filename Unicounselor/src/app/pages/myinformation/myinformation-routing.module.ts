import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyinformationPage } from './myinformation.page';

const routes: Routes = [
  {
    path: '',
    component: MyinformationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyinformationPageRoutingModule {}
