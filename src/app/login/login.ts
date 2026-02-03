import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth-service/auth-service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login {
  
  returnUrl: string | null = null;
  success = '';
  error= '';
  showFeedback: boolean = false;

  private route = inject(ActivatedRoute); 
  public router = inject(Router);
  private authService = inject(AuthService);
  

  loginForm = new FormGroup({
    email: new FormControl('',
      [Validators.required,
      Validators.minLength(1)]
    ),
    password: new FormControl('',
      [Validators.required,
      Validators.minLength(1)]
    ),
  })

   ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
  }

onLogin() {
  this.error = '';
  this.success = '';
  this.showFeedback = false;

  this.authService.login({
    email: this.loginForm.value.email as string,
    password: this.loginForm.value.password as string
  })
  .then(() => {
    this.success = 'Login effettuato con successo 🎉';
    this.showFeedback = true;

    setTimeout(() => {
      if (this.returnUrl) {
        this.router.navigateByUrl(this.returnUrl); //se hai premuto 'Accedi' per inserire un commento
      } else {
        this.router.navigate(['/homepage']);
      }
    }, 1500);
  })
  .catch((error) => {
    this.error = error?.error?.message || 'Errore di login';
    this.showFeedback = true;

    setTimeout(() => {
      this.showFeedback = false;
    }, 2500);
  });
}

  backToMap(){
    this.router.navigate(['/homepage']);
  }

}
