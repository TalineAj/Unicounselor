import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
// import{
//   redirectUnauthorizedTo,
//   redirectLoggedInTo,
//   canActivate,
// } from '@angular/fire/auth-guard' ;

// const redirectUnauthorizedToLogin = ()=> redirectUnauthorizedTo(['']);
// const redirectLoggedInToHome =()=>redirectLoggedInTo(['home'])
// ;
const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)

  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'tips',
    loadChildren: () => import('./pages/tips/tips.module').then( m => m.TipsPageModule)
  },
  {
    path: 'appointments',
    loadChildren: () => import('./pages/appointments/appointments.module').then( m => m.AppointmentsPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'myinformation',
    loadChildren: () => import('./pages/myinformation/myinformation.module').then( m => m.MyinformationPageModule)
  },
  {
    path: 'myappointments/:myusername',
    loadChildren: () => import('./pages/myappointments/myappointments.module').then( m => m.MyappointmentsPageModule)
  },
  {
    path: 'homec',
    loadChildren: () => import('./pages/homec/homec.module').then( m => m.HomecPageModule)
  },
  {
    path: 'appointmentsc',
    loadChildren: () => import('./pages/appointmentsc/appointmentsc.module').then( m => m.AppointmentscPageModule)
  },
  {
    path: 'tipsc',
    loadChildren: () => import('./pages/tipsc/tipsc.module').then( m => m.TipscPageModule)
  },
  {
    path: 'profilec',
    loadChildren: () => import('./pages/profilec/profilec.module').then( m => m.ProfilecPageModule)
  },
  {
    path: 'myinformationc',
    loadChildren: () => import('./pages/myinformationc/myinformationc.module').then( m => m.MyinformationcPageModule)
  },
  {
    path: 'myreviews',
    loadChildren: () => import('./pages/myreviews/myreviews.module').then( m => m.MyreviewsPageModule)
  },
  {
    path: 'myappointmentsc',
    loadChildren: () => import('./pages/myappointmentsc/myappointmentsc.module').then( m => m.MyappointmentscPageModule)
  },  {
    path: 'calender',
    loadChildren: () => import('./pages/calender/calender.module').then( m => m.CalenderPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
