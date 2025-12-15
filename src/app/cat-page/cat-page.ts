import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { ActivatedRoute, Router } from '@angular/router';
import { AvvistamentiService } from '../services/avvistamenti-service/avvistamenti-service';
import { MapComponent } from '../map/map';
import * as showdown from 'showdown';
import { CommentsService } from '../services/comments-service/comments-service';

@Component({
  selector: 'app-cat-page',
  standalone: true,
  templateUrl: './cat-page.html',
  styleUrls: ['./cat-page.scss'],
  imports: [CommonModule, FormsModule, MapComponent]
})

export class CatPageComponent implements OnInit {

  avvistamento: any = null;
  commenti: any[] = []; 
  nuovoCommento: string = ''; 

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private avvService: AvvistamentiService,
    private commentsService: CommentsService
  ) {}

  converter = new showdown.Converter();
  descrizioneHtml: string = '';


  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.caricaAvvistamento(id);
  }

  caricaAvvistamento(id: number) {
    this.avvService.getById(id).subscribe(res => {
      this.avvistamento = res;
      this.descrizioneHtml = this.converter.makeHtml(this.avvistamento.descrizione);

      // commenti fake recuperati dal service
       this.commentsService.getByAvvistamento(id).subscribe(c => this.commenti = c);
       });
  }

  aggiungiCommento() {
    if (!this.nuovoCommento.trim()) return;
    
    this.commentsService.create(this.avvistamento.id, 'Tu', this.nuovoCommento)
    .subscribe(nuovo => this.commenti.push(nuovo));

    this.nuovoCommento = '';
  }

  vaiAlProfiloUtente(userId: number) {
    this.router.navigate(['/utente', userId]);
  }
}
