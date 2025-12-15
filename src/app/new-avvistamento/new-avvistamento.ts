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
    console.log("File selezionato:", this.file.name);
  }
}

  creaAvvistamento() {
    if (!this.titolo || !this.descrizione) return;

    this.avvService.create({
      userId: 1, // TEMPORANEO
      titolo: this.titolo,
      descrizione: this.descrizione,
      file: this.file,
      lat: this.lat,
      lng: this.lng
    }).subscribe(nuovo => {
      console.log('Nuovo avvistamento creato:', nuovo);
      this.router.navigate(['/gatto', nuovo.id]);
    });
  }

}

