import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth-service/auth-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BackendService } from '../services/rest-backend/backend-service';

@Component({
  selector: 'app-sign-up',
  imports: [FormsModule, CommonModule],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.scss',
})
export class SignUp {
  email = '';
  password = '';
  error = '';
  success = '';
  username = '';
  showFeedback: boolean = false;

  constructor(private backend: BackendService, private router: Router) {}

  onSignin() {
  this.error = '';
  this.success = '';
  this.showFeedback = false;

  this.backend.signup({
    email: this.email,
    password: this.password,
    userName: this.username
  }).subscribe({
    next: () => {
      this.success = 'Registrazione avvenuta con successo 🎉';
      this.showFeedback = true;

      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 1500);
    },
    error: (err) => {
      if (err.status === 409) {
        this.error = 'Email già registrata';
      } else {
        this.error = 'Errore durante la registrazione';
      }

      this.showFeedback = true;

      setTimeout(() => {
        this.showFeedback = false;
      }, 2500);
    }
  });
}

backToMap(){
    this.router.navigate(['/homepage']);
  }
}
