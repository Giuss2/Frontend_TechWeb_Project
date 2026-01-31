import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AvvistamentiService } from '../services/avvistamenti-service/avvistamenti-service';
import { Avvistamento, Map } from '../map/map';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-avvistamento',
  imports: [Map, FormsModule, CommonModule],
  templateUrl: './new-avvistamento.html',
  styleUrl: './new-avvistamento.scss',
})
export class NewAvvistamento {

  titolo: string = '';
  descrizione: string = '';
  file: File | null = null;
  lat: number = 0;
  lng: number = 0;
  avvistamenti: Avvistamento[] = [];

    
  private router = inject(Router);
  private avvService= inject(AvvistamentiService);



ngOnInit() {
  this.avvService.getAll().subscribe({
    next: (data) => {
      this.avvistamenti = data;
    },
    error: (err) => console.error('Errore caricamento avvistamenti', err)
  });
}


@ViewChild('descrizioneInput') descrizioneInput!: ElementRef<HTMLTextAreaElement>;



wrapSelection(before: string, after: string) {
  const textarea = this.descrizioneInput.nativeElement;

  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const selected = textarea.value.substring(start, end);

  const newText = before + selected + after;

  textarea.setRangeText(newText, start, end, 'end');
  textarea.focus();

  this.descrizione = textarea.value;
}


 onFileSelected(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    this.file = input.files[0];
    console.log('File selezionato:', this.file);
  }
}


 creaAvvistamento() {
  const data = {
    titolo: this.titolo,
    descrizione: this.descrizione,
    lat: this.lat,
    lng: this.lng,
    foto: this.file?.name 
  };

  this.avvService.create(data).subscribe({
    next: (createdCat) => {
      console.log('Avvistamento creato');
       this.router.navigate(['/cat', createdCat.id]);
    },
    error: (err) => {
      console.error('Errore creazione avvistamento', err);
    }
  });
}


get formValido(): boolean {
  return (
    this.titolo.trim().length > 0 &&
    this.titolo.trim().length <= 50 &&
    this.descrizione.trim().length > 0 &&
    this.lat !== 0 &&
    this.lng !== 0 
    //this.file !== null
  );
}

get messaggioErrore(): string | null {
  if (!this.titolo.trim()) {
    return 'Inserisci un titolo';
  }

  if (this.titolo.trim().length > 50) {
    return 'Il titolo non può superare 50 caratteri';
  }

  if (!this.descrizione.trim()) {
    return 'Inserisci una descrizione';
  }

  if (this.lat === 0 || this.lng === 0) {
    return 'Seleziona una posizione sulla mappa';
  }


  return null;
}

onAnnulla(){
    this.router.navigate(['/profile']);
  }



}

