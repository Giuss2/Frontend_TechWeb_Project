import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
//import { LoginComponent } from './login/login.component';
//import { LogoutComponent } from './logout/logout.component';
//import { ProfileComponent } from './profile/profile.component';
//import { OtherProfileComponent } from './other-profile/other-profile.component';

export const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  //{ path: 'profile', component: ProfileComponent },
  //{ path: 'profile/:id', component: OtherProfileComponent },
  { path: '**', redirectTo: '' } // wildcard, redirect alla home se URL non trovato
];
