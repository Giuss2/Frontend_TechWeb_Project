import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  

  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}
  // MOCK dei commenti
  /*
  private commentiFake: any[] = [
    { id: 1, avvistamentoId: 1, user: 'Alice', testo: 'Che bel gatto!', createdAt: new Date('2025-12-09') },
    { id: 1, avvistamentoId: 1, user: 'Alice', testo: 'Vorrei portarlo con me!', createdAt: new Date('2025-12-09') },
    { id: 1, avvistamentoId: 1, user: 'Alice', testo: 'Come lo chiamiamo?', createdAt: new Date('2025-12-09') },
    { id: 2, avvistamentoId: 1, user: 'Bob', testo: 'L’ho visto anch’io ieri!', createdAt: new Date('2025-12-08') },
    { id: 2, avvistamentoId: 1, user: 'Bob', testo: 'Birba', createdAt: new Date('2025-12-08') },
    { id: 2, avvistamentoId: 1, user: 'Bob', testo: 'Oppure scotch', createdAt: new Date('2025-12-08') },
    { id: 3, avvistamentoId: 2, user: 'Carla', testo: 'Molto socievole!', createdAt: new Date('2025-12-07') }
  ];
*/


// Recupera tutti i commenti di un avvistamento
getByAvvistamento(avvistamentoId: number): Observable<any[]> {
  return this.http.get<any[]>(
    `${this.apiUrl}/comments/${avvistamentoId}/comments`,
    { withCredentials: true }
  );
}

// Aggiunge un nuovo commento (RICHIEDE LOGIN)
create(avvistamentoId: number, testo: string): Observable<any> {
  const token = localStorage.getItem('token');

  return this.http.post(
  `http://localhost:3000/comments/${avvistamentoId}/comments`,
  { testo: testo },
  {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  }
)

}


// Cancella un commento (RICHIEDE LOGIN)
delete(id: number): Observable<any> {
  return this.http.delete(
    `${this.apiUrl}/comments/comments/${id}`,
    { withCredentials: true }
  );
}

}
