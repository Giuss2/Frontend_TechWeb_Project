import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MapComponent, Avvistamento } from '../map/map';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, MapComponent],
  templateUrl: './profile.html',
  styleUrls: ['./profile.scss']
})
export class ProfileComponent {

  avvistamenti: Avvistamento[] = [
    // CARICARE gli avvistamenti dell’utente loggato
  ];

  constructor(private router: Router) {}

  // Event handler per i marker
  apriProfiloUtente(userId: number) {
    this.router.navigate(['/profilo', userId]);
  }

}
