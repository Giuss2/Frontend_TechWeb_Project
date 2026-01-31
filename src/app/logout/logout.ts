import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../services/auth-service/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  standalone: true,
  templateUrl: './logout.html',
  styleUrls: ['./logout.scss'],
})
export class Logout implements OnInit {

  private router = inject(Router);
  private auth = inject(AuthService);


  ngOnInit() {
    this.auth.logout();


    setTimeout(() => {
      this.router.navigate(['/']);
    }, 2000);
  }

  
}
