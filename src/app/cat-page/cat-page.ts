import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AvvistamentiService } from '../services/avvistamenti-service/avvistamenti-service';
import { AuthService } from '../services/auth-service/auth-service';
import * as showdown from 'showdown';
import { CommentsService } from '../services/comments-service/comments-service';
import { BackendService } from '../services/rest-backend/backend-service';
import { Map } from '../map/map';
import DOMPurify from 'dompurify';

@Component({
  selector: 'app-cat-page',
  standalone: true,
  templateUrl: './cat-page.html',
  styleUrls: ['./cat-page.scss'],
  imports: [CommonModule, FormsModule, RouterModule, Map]
})

export class CatPage implements OnInit {

  avvistamento: any = null;
  commenti: any[] = []; 
  pagination: {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
} = { total: 0, page: 1, limit: 5, totalPages: 0 };

  nuovoCommento: string = ''; 
  avvistamenti: any[] = [];
  page: number = 1;
  limit: number = 5;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private avvService: AvvistamentiService,
    private commentsService: CommentsService,
    public auth: AuthService,
    public backend: BackendService
  ) {}

  converter = new showdown.Converter({
    simpleLineBreaks: true,
    openLinksInNewWindow: true
  });
  descrizioneHtml: string = '';


  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
      this.page = Number(this.route.snapshot.queryParamMap.get('page')) || 1;
      this.limit = Number(this.route.snapshot.queryParamMap.get('limit')) || 5;

    this.caricaAvvistamento(id);
    this.loadComments(id);
  }

  caricaAvvistamento(id: number) {
  this.avvService.getById(id).subscribe(res => {
    this.avvistamento = res;
    const rawHtml = this.converter.makeHtml(this.avvistamento.descrizione);

    //sanificazione
    this.descrizioneHtml = DOMPurify.sanitize(rawHtml);
   
    this.avvistamenti = [this.avvistamento];

    this.commentsService
      .getByAvvistamento(id)
      .subscribe(res => {
    this.commenti = res.comments; 
    this.pagination = res.pagination;  
  });
  });
}


  aggiungiCommento() {
  if (!this.auth.isLogged) {
    this.router.navigate(['/login']);
    return;
  }

    if (!this.nuovoCommento.trim()) return;
    const user = this.auth.user;
    if(!user) return;
    
    this.commentsService.create(this.avvistamento.id, this.nuovoCommento)
    .subscribe(nuovo => this.commenti.unshift(nuovo));  //il nuovo commento viene mostrato all'inizio

    this.nuovoCommento = '';
  }

  vaiAlProfiloUtente(userId: number) {
    this.router.navigate(['/profile', userId]);
  }

  backToMap(){
    this.router.navigate(['/homepage']);
  }

  getFotoUrl(foto: string): string {
  if (!foto) {
    return 'assets/cats_imgs/placeholder.jpg';
  }

  // se è già un URL completo 
  if (foto.startsWith('http')) {
    return foto;
  }

  // se è un file locale
  return `assets/cats_imgs/${foto}`;
}

eliminaCommento(commentId: number) {
  const token = this.auth.token; 

  if (!token) {
    alert('Devi essere loggato per eliminare un commento!');
    return;
  }

  this.commentsService.delete(commentId, token).subscribe({
    next: () => {
      this.commenti = this.commenti.filter(c => c.id !== commentId);
    },
    error: (err) => {
      console.error('Errore eliminazione commento', err);
      if (err.status === 401) alert('Non sei autorizzato!');
      else if (err.status === 403) alert('Non puoi eliminare il commento di un altro utente!');
      else alert('Errore eliminazione commento!');
    }
  });
}

loadComments(page: number) {
  if (!this.avvistamento || !this.avvistamento.id) {
    console.warn('Avvistamento non disponibile, skipping loadComments');
    return;
  }

  this.commentsService.getByAvvistamento(this.avvistamento.id, page, 5)
    .subscribe(res => {
      this.commenti = res.comments;
      this.pagination = res.pagination;
    });
}

prevPage() {
  if (this.pagination?.page && this.pagination.page > 1) {
    this.loadComments(this.pagination.page - 1);
  }
}

nextPage() {
  if (this.pagination?.page && this.pagination.page < (this.pagination?.totalPages ?? 1)) {
    this.loadComments(this.pagination.page + 1);
  }
}



}
