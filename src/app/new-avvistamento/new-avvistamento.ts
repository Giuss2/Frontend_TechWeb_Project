import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AvvistamentiService } from '../services/avvistamenti-service/avvistamenti-service';
import { AuthService } from '../services/auth-service/auth-service';
import { MapComponent } from '../map/map';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-avvistamento',
  imports: [MapComponent, FormsModule, CommonModule],
  templateUrl: './new-avvistamento.html',
  styleUrl: './new-avvistamento.scss',
})
export class NewAvvistamento {

  titolo: string = '';
  descrizione: string = '';
  file!: File | null;
  lat: number = 0;
  lng: number = 0;

  constructor(
    private avvService: AvvistamentiService,
    private auth: AuthService,
    private router: Router
  ) {}

  onFileSelected(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    this.file = input.files[0];
  }
}

  creaAvvistamento() {
  const user = this.auth.getUser();
  if (!user) {
    this.router.navigate(['/login']);
    return;
  }

  if (!this.titolo || !this.descrizione) return;

  const fakeImg = this.file
    ? URL.createObjectURL(this.file) // preview locale. Diventerà img: response.imageUrl
    : 'assets/cats_imgs/gatto_randagio.jpg';

  this.avvService.create({
    userId: user.id,
    titolo: this.titolo,
    descrizione: this.descrizione,
    img: fakeImg,     //  ATTENZIONE
    lat: this.lat,
    lng: this.lng,
    createdAt: new Date()
  }).subscribe(nuovo => {
    this.router.navigate(['/cat', nuovo.id]);
  });
}

get formValido(): boolean {
  return (
    this.titolo.trim().length > 0 &&
    this.descrizione.trim().length > 0 &&
    this.lat !== 0 &&
    this.lng !== 0
    // && this.file !== null  per ora la foto è opzionale...potrei renderla obbligatoria
  );
}

get messaggioErrore(): string | null {
  if (!this.titolo.trim()) {
    return 'Inserisci un titolo';
  }

  if (!this.descrizione.trim()) {
    return 'Inserisci una descrizione';
  }

  if (this.lat === 0 || this.lng === 0) {
    return 'Seleziona una posizione sulla mappa';
  }

  // if (!this.file) {
  //   return 'Carica una foto';
  // }

  return null;
}



}

