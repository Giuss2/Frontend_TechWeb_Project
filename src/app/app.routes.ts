import { Routes } from '@angular/router';
import { Homepage } from './homepage/homepage';
import { LoginComponent } from './login/login';
import { LogoutComponent } from './logout/logout';
//import { ProfileComponent } from './profile/profile.component';
//import { OtherProfileComponent } from './other-profile/other-profile.component';

export const routes: Routes = [
  { path: '', component: Homepage },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  //{ path: 'profile', component: ProfileComponent },
  //{ path: 'profile/:id', component: OtherProfileComponent },
  { path: '**', redirectTo: '' } // wildcard, redirect alla home se URL non trovato
];
