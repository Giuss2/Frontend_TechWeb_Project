import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BackendService {

  private http = inject(HttpClient);
  private url = "http://localhost:3000/auth";

  private jsonHttpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    responseType: 'json' as const,
  };

  signin(signupCredentials: { email: string, password: string }) {
    return this.http.post(`${this.url}/signup`, signupCredentials, this.jsonHttpOptions);
  }

  login(loginCredentials: { email: string, password: string }) {
    return this.http.post<{ token: string }>(
      `${this.url}/login`,
      loginCredentials,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }


  /*login(email: string, password: string): boolean {
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
  }*/


}
