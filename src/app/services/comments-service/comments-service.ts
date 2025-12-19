import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  
constructor() {}

  // MOCK dei commenti
  private commentiFake: any[] = [
    { id: 1, avvistamentoId: 1, user: 'Alice', testo: 'Che bel gatto!', createdAt: new Date('2025-12-09') },
    { id: 1, avvistamentoId: 1, user: 'Alice', testo: 'Vorrei portarlo con me!', createdAt: new Date('2025-12-09') },
    { id: 1, avvistamentoId: 1, user: 'Alice', testo: 'Come lo chiamiamo?', createdAt: new Date('2025-12-09') },
    { id: 2, avvistamentoId: 1, user: 'Bob', testo: 'L’ho visto anch’io ieri!', createdAt: new Date('2025-12-08') },
    { id: 2, avvistamentoId: 1, user: 'Bob', testo: 'Birba', createdAt: new Date('2025-12-08') },
    { id: 2, avvistamentoId: 1, user: 'Bob', testo: 'Oppure scotch', createdAt: new Date('2025-12-08') },
    { id: 3, avvistamentoId: 2, user: 'Carla', testo: 'Molto socievole!', createdAt: new Date('2025-12-07') }
  ];

  // Recupera tutti i commenti di un avvistamento
  getByAvvistamento(avvistamentoId: number): Observable<any[]> {
    const filtrati = this.commentiFake.filter(c => c.avvistamentoId === avvistamentoId);
    return of(filtrati);
  }

  // Aggiunge un nuovo commento
  create(avvistamentoId: number, user: string, testo: string): Observable<any> {
    const nuovo = {
      id: this.commentiFake.length + 1,
      avvistamentoId,
      user,
      testo,
      createdAt: new Date()
    };
    this.commentiFake.push(nuovo);
    return of(nuovo);
  }

  // Cancella un commento
  delete(id: number): Observable<boolean> {
    this.commentiFake = this.commentiFake.filter(c => c.id !== id);
    return of(true);
  }


}
