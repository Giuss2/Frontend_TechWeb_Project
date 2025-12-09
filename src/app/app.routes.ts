import { Routes } from '@angular/router';
import { Homepage } from './homepage/homepage';
import { LoginComponent } from './login/login';
import { LogoutComponent } from './logout/logout';
import { SignIn } from './sign-in/sign-in';
import { ProfiloComponent } from './profile/profile';
import { OtherProfile } from './other-profile/other-profile';

export const routes: Routes = [
  { path: '', component: Homepage },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'signin', component: SignIn },
  { path: 'profile', component: ProfiloComponent},
  { path: 'profile/:id', component: OtherProfile },
  { path: '**', redirectTo: '' } // wildcard, redirect alla home se URL non trovato
];
