import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth-service/auth-service';

@Injectable({
  providedIn: 'root'
})
export class AvvistamentiService {
   private http = inject(HttpClient);
  private auth = inject(AuthService);

  private apiUrl = 'http://localhost:3000';

  // Recupera tutti gli avvistamenti
  getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/cats`);
  }

  // Recupera un avvistamento specifico
  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/cats/${id}`);
  }

  // Recupera gli avvistamenti dell’utente
  getByUser(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/cats?userId=${userId}`);
  }

  // Crea un avvistamento 
  create(data: any): Observable<any> {
  const token = localStorage.getItem('token');

  return this.http.post<any>(
    `${this.apiUrl}/cats`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
}


  
  // Cancella un avvistamento
  delete(id: number): Observable<any> {
    const token = this.auth.user ? localStorage.getItem('token') : null;
    const headers = token
      ? new HttpHeaders({ 'Authorization': `Bearer ${token}` })
      : undefined;

    return this.http.delete(`${this.apiUrl}/cats/${id}`, { headers });
  }
}
