import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth-service/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  standalone: true,
  templateUrl: './logout.html',
  styleUrls: ['./logout.scss'],
})
export class LogoutComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.auth.logout();

    // Redirect dopo 2 secondi
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 2000);
  }

  
}
