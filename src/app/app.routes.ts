import { Routes } from '@angular/router';
import { Homepage } from './homepage/homepage';
import { Login } from './login/login';
import { Logout } from './logout/logout';
import { SignUp } from './sign-up/sign-up';
import { ProfiloComponent } from './profile/profile';
import { OtherProfile } from './other-profile/other-profile';
import { CatPage } from './cat-page/cat-page';
import { NewAvvistamento } from './new-avvistamento/new-avvistamento';
import { authorizationGuard } from './guards/authorization-guard';

export const routes: Routes = [
  { path: '', component: Homepage },
  { path: 'login', component: Login },
  { path: 'logout', component: Logout },
  { path: 'signup', component: SignUp },
  { path: 'profile', component: ProfiloComponent, canActivate: [authorizationGuard]},
  { path: 'profile/:id', component: OtherProfile},
  { path: 'cat/:id', component: CatPage },
  { path: 'create-avvistamento', component: NewAvvistamento, canActivate: [authorizationGuard] },
  { path: '**', redirectTo: '' } // wildcard, redirect alla home se URL non trovato
];
