import { Component, inject } from '@angular/core';
import { AuthService } from '../services/auth-service/auth-service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { BackendService } from '../services/rest-backend/backend-service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss']
})
export class Navbar {

  private router = inject(Router);
  public auth = inject(AuthService);
  public backend= inject(BackendService);


  login() {
    this.router.navigate(['/login']);
  }

  signup() {
    this.router.navigate(['/signup']);
  }

  logout() {
  this.router.navigate(['/logout']);
}


  profile() {          
    this.router.navigate(['/profile']);  
  }

}
