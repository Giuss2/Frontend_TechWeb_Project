import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // <-- necessario per ngModel
import { ActivatedRoute, Router } from '@angular/router';
import { AvvistamentiService } from '../services/avvistamenti-service/avvistamenti-service';
import { MapComponent } from '../map/map';

@Component({
  selector: 'app-cat-page',
  standalone: true,
  templateUrl: './cat-page.html',
  styleUrls: ['./cat-page.scss'],
  imports: [CommonModule, FormsModule, MapComponent] // <-- FormsModule incluso
})

export class CatPageComponent implements OnInit {

  avvistamento: any = null;
  commenti: any[] = []; // array dei commenti
  nuovoCommento: string = ''; // input per il nuovo commento

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private avvService: AvvistamentiService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.caricaAvvistamento(id);
  }

  caricaAvvistamento(id: number) {
    this.avvService.getById(id).subscribe(res => {
      this.avvistamento = res;

      // inizializziamo commenti fake
      this.commenti = [
        { user: 'Alice', testo: 'Che bel gatto!', data: '2025-12-09' },
        { user: 'Bob', testo: 'L’ho visto anch’io ieri!', data: '2025-12-08' }
      ];
    });
  }

  aggiungiCommento() {
    if (!this.nuovoCommento.trim()) return;
    this.commenti.push({
      user: 'Tu', 
      testo: this.nuovoCommento, 
      data: new Date().toISOString().split('T')[0]
    });
    this.nuovoCommento = '';
  }

  vaiAlProfiloUtente(userId: number) {
    this.router.navigate(['/utente', userId]);
  }
}
