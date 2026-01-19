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

  signup(data: { email: string; password: string; userName: string }) {
    return this.http.post(
      `${this.url}/signup`,
      data,
      this.jsonHttpOptions
    );
  }

  login(loginCredentials: { email: string, password: string }) {
    return this.http.post<{ token: string }>(
      `${this.url}/login`,
      loginCredentials,
      this.jsonHttpOptions
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

  signup(email: string, password: string): boolean {
    // *** PER ORA È UN MOCK. AGGIUNGI LOGICA ***
    if (email === 'test@test.com' && password === '1234') {
      this.isLogged.set(true);
      localStorage.setItem('loggedIn', 'true');
      return true;
    }

    return false;
  }*/


}
