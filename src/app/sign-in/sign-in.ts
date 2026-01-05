import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth-service/auth-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BackendService } from '../services/rest-backend/backend-service';

@Component({
  selector: 'app-sign-in',
  imports: [FormsModule, CommonModule],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.scss',
})
export class SignIn {
  email = '';
  password = '';
  error = '';

  constructor(private backend: BackendService, private router: Router) {}

  onSignin() {
//    const success = this.backend.signin(this.email, this.password);

  //  if (!success) {
    //  this.error = 'Credenziali non valide';
      //return;
    //}

    //this.router.navigate(['/']);
  }
}
