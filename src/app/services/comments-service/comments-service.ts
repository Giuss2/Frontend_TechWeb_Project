import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BackendService } from '../rest-backend/backend-service';

@Injectable({ providedIn: 'root' })
export class CommentsService {
  private http = inject(HttpClient);
  private backend = inject(BackendService);

  apiUrl = "http://localhost:3000";

  
// Recupera tutti i commenti di un avvistamento
getByAvvistamento(avvistamentoId: number, page = 1, limit = 25) {
  return this.http.get<{comments: any[], pagination: any}>(
    `${this.apiUrl}/cats/${avvistamentoId}/comments?page=${page}&limit=${limit}`,
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


  // Cancella un commento passando il token JWT
   delete(commentId: number, token: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/comments/${commentId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
}
