import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AvvistamentiService } from '../services/avvistamenti-service/avvistamenti-service';
import { MapComponent } from '../map/map';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-avvistamento',
  imports: [MapComponent, FormsModule],
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
    private router: Router
  ) {}

  onFileSelected(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    this.file = input.files[0];
  }
}

  creaAvvistamento() {
  if (!this.titolo || !this.descrizione) return;

  const fakeImg = this.file
    ? URL.createObjectURL(this.file) // preview locale. Diventerà img: response.imageUrl
    : 'assets/cats_imgs/gatto_randagio.jpg';

  this.avvService.create({
    userId: 1,
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

}

