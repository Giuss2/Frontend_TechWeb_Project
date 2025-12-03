import { Component } from '@angular/core';
import { AuthService } from '../services/auth-service/auth-service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss']
})
export class Navbar {
  constructor(public auth: AuthService, private router: Router) {}

  login() {
    this.router.navigate(['/login']);
  }

  logout() {
    this.auth.logout();           
    this.router.navigate(['/']);  
  }
}
