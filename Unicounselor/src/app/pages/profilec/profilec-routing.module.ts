import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilecPage } from './profilec.page';

const routes: Routes = [
  {
    path: '',
    component: ProfilecPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilecPageRoutingModule {}
