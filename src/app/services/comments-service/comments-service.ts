import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  

  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

// Recupera tutti i commenti di un avvistamento
getByAvvistamento(avvistamentoId: number): Observable<any[]> {
  return this.http.get<any[]>(
    `${this.apiUrl}/cats/${avvistamentoId}/comments`,
    { withCredentials: true }
  );
}

// Aggiunge un nuovo commento (RICHIEDE LOGIN)
create(avvistamentoId: number, testo: string): Observable<any> {
  const token = localStorage.getItem('token');

  return this.http.post(
    `http://localhost:3000/cats/${avvistamentoId}/comments`,
    { testo: testo },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }
  );
}


// Cancella un commento (RICHIEDE LOGIN)
delete(id: number): Observable<any> {
  return this.http.delete(
    `${this.apiUrl}/comments/${id}`,
    { withCredentials: true }
  );
}

}
