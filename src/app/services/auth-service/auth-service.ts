import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  getUser(): any {
    throw new Error('Method not implemented.');   //DA FARE
  }

  isLogged = signal(true);

  constructor() {
    // recupera lo stato dal localStorage
    const saved = localStorage.getItem('loggedIn');
    if (saved === null) {
      this.isLogged.set(true); // test
    } else {
      this.isLogged.set(saved === 'true');
    }
  }

  login(email: string, password: string): boolean {
    // *** PER ORA È UN MOCK. AGGIUNGI LOGICA ***
    if (email === 'test@test.com' && password === '1234') {
      this.isLogged.set(true);
      localStorage.setItem('loggedIn', 'true');
      return true;
    }

    return false;
  }

  signin(email: string, password: string): boolean {
    // *** PER ORA È UN MOCK. AGGIUNGI LOGICA ***
    if (email === 'test@test.com' && password === '1234') {
      this.isLogged.set(true);
      localStorage.setItem('loggedIn', 'true');
      return true;
    }

    return false;
  }

  logout() {
    this.isLogged.set(false);
    localStorage.removeItem('loggedIn');
  }
}
