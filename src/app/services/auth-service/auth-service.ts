import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private mockUser = {
    id: 1,
    name: 'Test User',
    email: 'test@test.com'
  };
  isLogged= signal(false);

/*
  getCurrentUserProfile(): {
  }
*/


  constructor() {
    const saved = localStorage.getItem('loggedIn');
    this.isLogged.set(saved === 'true');
  }

  getUser() {
    return this.isLogged() ? this.mockUser : null;
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
