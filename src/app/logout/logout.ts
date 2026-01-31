import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth-service/auth-service';
import { Router } from '@angular/router';

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


    setTimeout(() => {
      this.router.navigate(['/']);
    }, 2000);
  }

  
}
