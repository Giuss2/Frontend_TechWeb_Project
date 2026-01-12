import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth-service/auth-service';
import { Router } from '@angular/router';
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

  private router = inject(Router);
  private authService = inject(AuthService);
  //private toastr = inject(ToastrService);
  error= '';

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

  onLogin(){
    
     

      this.authService.login({
        email: this.loginForm.value.email as string,
        password: this.loginForm.value.password as string
      })
      .then( () =>{
        //this.toastr.success("Logged in succesfully!", "Success");
         this.router.navigate(["/"]);
      })
      .catch((error: Error) => {
        if(error instanceof HttpErrorResponse){
            //this.toastr.error(error.error.message);
            this.error = error.error?.message || 'Errore di login';
        }else{
          this.error= 'Errore imprevisto';
        }
      })
    
  }
/*
  email = '';
  password = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  onLogin() {
    const success = this.auth.login(this.email, this.password);

    if (!success) {
      this.error = 'Credenziali non valide';
      return;
    }

    this.router.navigate(['/']);
  }*/
}
