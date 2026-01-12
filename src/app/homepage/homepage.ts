import { Component, signal, OnInit, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth-service/auth-service';
import { BackendService } from '../services/rest-backend/backend-service';
import { Map } from '../map/map';

@Component({
  selector: 'app-homepage',
  imports: [CommonModule, Map],
  templateUrl: './homepage.html',
  styleUrls: ['./homepage.scss'],
})
export class Homepage {

  showWelcomeMessage = signal(false);

  constructor(
    private router: Router,
    public auth: AuthService,
    public backend: BackendService
  ) {}

  ngOnInit() {
    const lastSeenDate = localStorage.getItem('welcomeLastSeen');
    const today = new Date().toDateString();
    const logged = this.auth.isLogged;

    const shouldShow = !logged && lastSeenDate !== today;

    this.showWelcomeMessage.set(shouldShow);
  }

  closeWelcomeMessage() {
    this.showWelcomeMessage.set(false);
    const today = new Date().toDateString();
    localStorage.setItem('welcomeLastSeen', today);
  }

  apriCatPage(gattoId: number) {
    this.router.navigate(['/cat', gattoId]);
  }
}
