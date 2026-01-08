import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AvvistamentiService {

  private apiUrl= 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  //  SIMULAZIONE (DA CAMBIARE QUANDO AGGIUNGI BACKEND)
  /*private avvistamentiFake = [
    {
      id: 1,
      userId: 1,
      titolo: "Gatto Nero",
      descrizione: "Avvistato vicino al parco. Ha una macchiolina bianca sulla zampa sinistra anteriore. NON prendere in braccio: è aggressivo.",
      img: "assets/cats_imgs/gatto_nero.jpg",
      lat: 45.4642,
      lng: 9.19,
      createdAt: new Date('2024-05-10')
    },
    {
      id: 2,
      userId: 1,
      titolo: "Gatto Tigrato",
      descrizione: "Molto socievole!",
      img: "assets/cats_imgs/gatto_randagio.jpg",
      lat: 41.9028,
      lng: 12.4964,
      createdAt: new Date('2024-05-11')
    }
  ];*/

  // Recupera tutti gli avvistamenti
  getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/cats/catsPages`);
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
