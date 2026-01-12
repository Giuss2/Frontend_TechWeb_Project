import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AvvistamentiService {

  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

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
    return this.http.post<any>(`${this.apiUrl}/cats`, data);
  }

  // Cancella un avvistamento
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/cats/${id}`);
  }
}
