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
  username = '';

  constructor(private backend: BackendService, private router: Router) {}

  onSignin() {
  this.error = '';

  this.backend.signup({
    email: this.email,
    password: this.password,
    userName: this.username
  }).subscribe({
    next: () => {
      console.log('Registrazione completata');
      this.router.navigate(['/login']); // dopo signup → vai a login
    },
    error: (err) => {
      console.error('Errore signup', err);

      if (err.status === 409) {
        this.error = 'Email già registrata';
      } else {
        this.error = 'Errore durante la registrazione';
      }
    }
  });
}

}
