import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AvvistamentiService } from '../services/avvistamenti-service/avvistamenti-service';
import { AuthService } from '../services/auth-service/auth-service';
import * as showdown from 'showdown';
import { CommentsService } from '../services/comments-service/comments-service';
import { BackendService } from '../services/rest-backend/backend-service';

@Component({
  selector: 'app-cat-page',
  standalone: true,
  templateUrl: './cat-page.html',
  styleUrls: ['./cat-page.scss'],
  imports: [CommonModule, FormsModule, RouterModule]
})

export class CatPageComponent implements OnInit {

  avvistamento: any = null;
  commenti: any[] = []; 
  nuovoCommento: string = ''; 

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private avvService: AvvistamentiService,
    private commentsService: CommentsService,
    public auth: AuthService,
    public backend: BackendService
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
}
