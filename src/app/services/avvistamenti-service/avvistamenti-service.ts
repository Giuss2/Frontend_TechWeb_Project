import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AvvistamentiService {

  constructor() {}

  //  SIMULAZIONE (DA CAMBIARE QUANDO AGGIUNGI BACKEND)
  private avvistamentiFake = [
    {
      id: 1,
      userId: 1,
      titolo: "Gatto Nero",
      descrizione: "Avvistato vicino al parco.",
      fotoUrl: "assets/default-cat.jpg",
      lat: 45.4642,
      lng: 9.19
    },
    {
      id: 2,
      userId: 1,
      titolo: "Gatto Tigrato",
      descrizione: "Molto socievole!",
      fotoUrl: "assets/default-cat2.jpg",
      lat: 45.463,
      lng: 9.20
    }
  ];

  // Recupera tutti gli avvistamenti
  getAll(): Observable<any[]> {
    return of(this.avvistamentiFake);
  }

  // Recupera un avvistamento specifico
  getById(id: number): Observable<any> {
    const trovato = this.avvistamentiFake.find(a => a.id === id);
    return of(trovato ?? null);
  }

  // Recupera gli avvistamenti dell’utente
  getByUser(userId: number): Observable<any[]> {
    const filtrati = this.avvistamentiFake.filter(a => a.userId === userId);
    return of(filtrati);
  }

  // Crea un avvistamento 
  create(data: any): Observable<any> {
    const nuovo = {
      ...data,
      id: this.avvistamentiFake.length + 1
    };
    this.avvistamentiFake.push(nuovo);
    return of(nuovo);
  }

  // Cancella un avvistamento
  delete(id: number): Observable<boolean> {
    this.avvistamentiFake = this.avvistamentiFake.filter(a => a.id !== id);
    return of(true);
  }
}
