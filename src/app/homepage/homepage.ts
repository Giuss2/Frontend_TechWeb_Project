import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent, Avvistamento } from '../map/map';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth-service/auth-service';
import { AvvistamentiService } from '../services/avvistamenti-service/avvistamenti-service';

@Component({
  selector: 'app-homepage',
  imports: [CommonModule, MapComponent],
  templateUrl: './homepage.html',
  styleUrls: ['./homepage.scss'],
})
export class Homepage{
  constructor(private router: Router, public auth: AuthService, private avvistamentiService: AvvistamentiService) {}
  showWelcomeMessage = signal(true);

ngOnInit() {
  const seen = localStorage.getItem('seenWelcome');

  // legge lo stato di login dal service
  const logged = this.auth.isLogged();

  // mostra il messaggio solo se non è stato visto e non sei loggato
  this.showWelcomeMessage.set(!seen && !logged);
 /* this.avvistamentiService.getAll().subscribe(data => {
  this.avvistamenti = [...data];
});*/

}

  closeWelcomeMessage() {
    this.showWelcomeMessage.set(false);
    localStorage.setItem('seenWelcome', 'true');
  }

  avvistamenti: Avvistamento[] = [
    { id: 1, userId: 1, titolo: 'Gatto randagio a Roma', lat: 41.9028, lng: 12.4964, descrizione: 'Molto socievole', img: "assets/cats_imgs/gatto_nero.jpg", createdAt: "2024-05-10T10:30:00Z" },
    { id: 2, userId: 2, titolo: 'Gatto nero a Milano', lat: 45.4642, lng: 9.19, descrizione: 'Si nasconde dietro i cassonetti', img:  "assets/cats_imgs/gatto_randagio.jpg", createdAt: "2024-05-11T15:45:00Z" }
  ];


  apriCatPage(gattoId: number) {
    this.router.navigate(['/cat', gattoId]);
  }
   
}
