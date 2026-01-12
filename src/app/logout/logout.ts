import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth-service/auth-service';
import { Router } from '@angular/router';
import { BackendService } from '../services/rest-backend/backend-service';

@Component({
  selector: 'app-logout',
  standalone: true,
  templateUrl: './logout.html',
  styleUrls: ['./logout.scss'],
})
export class Logout implements OnInit {

  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit() {
    this.auth.logout();

    // Redirect dopo 2 secondi
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 2000);
  }

  
}
