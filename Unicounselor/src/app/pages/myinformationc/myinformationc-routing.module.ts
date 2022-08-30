import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyinformationcPage } from './myinformationc.page';

const routes: Routes = [
  {
    path: '',
    component: MyinformationcPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyinformationcPageRoutingModule {}
