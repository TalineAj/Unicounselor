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
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login', //the first page to be login
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }