import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent, Avvistamento } from '../map/map';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  imports: [CommonModule, MapComponent],
  templateUrl: './homepage.html',
  styleUrls: ['./homepage.scss'],
})
export class Homepage{
  constructor(private router: Router) {}
  showWelcomeMessage = signal(true);

  ngOnInit() {
    const seen = localStorage.getItem('seenWelcome');
    //this.showWelcomeMessage.set(!seen); prima o poi voglio che esca solo a utenti NON loggati
    this.showWelcomeMessage.set(true);
  }

  closeWelcomeMessage() {
    this.showWelcomeMessage.set(false);
    localStorage.setItem('seenWelcome', 'true');
  }

  avvistamenti: Avvistamento[] = [
    { id: 1, userId: 1, titolo: 'Gatto randagio a Roma', lat: 41.9028, lng: 12.4964, descrizione: 'Molto socievole' },
    { id: 2, userId: 2, titolo: 'Gatto nero a Milano', lat: 45.4642, lng: 9.19, descrizione: 'Si nasconde dietro i cassonetti' }
  ];


  apriProfiloUtente(userId: number) {
    this.router.navigate(['/profilo', userId]);
  }
   
}
