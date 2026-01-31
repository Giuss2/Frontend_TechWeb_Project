import { Injectable, inject, signal } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { BackendService } from '../rest-backend/backend-service';

type TokenPayload = {
  id: number;
  userName: string;
  exp?: number;
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private rest = inject(BackendService);

  private _token = signal<string | null>(null);
  private _user = signal<{ id: number; userName: string } | null>(null);

  constructor() {
  const token = localStorage.getItem('token');

  if (!token) return;

  try {
    const decoded = jwtDecode<TokenPayload>(token);

    if (decoded.exp && Date.now() >= decoded.exp * 1000) {
      // token scaduto
      this.logout();
      return;
    }

    this._token.set(token);
    this._user.set({
      id: decoded.id,
      userName: decoded.userName
    });

  } catch {
    this.logout();
  }
}


  private _setUserFromToken(token: string) {
    try {
      const decoded = jwtDecode<TokenPayload>(token);
      this._user.set({
        id: decoded.id,
        userName: decoded.userName
      });
    } catch (err) {
      console.error('[Auth] token non valido', err);
      this._user.set(null);
      this._token.set(null);
      localStorage.removeItem('token');
    }
  }

  get user() {
    return this._user();
  }

  get isLogged(): boolean {
    const token = this._token();
    if (!token) return false;

    try {
      const decoded = jwtDecode<TokenPayload>(token);
      return !!decoded.exp && Date.now() < decoded.exp * 1000;
    } catch {
      return false;
    }
  }

  login(credentials: { email: string; password: string }): Promise<void> {
    return new Promise((resolve, reject) => {
      this.rest.login(credentials).subscribe({
        next: (response) => {
          localStorage.setItem('token', response.token);
          this._token.set(response.token);
          this._setUserFromToken(response.token);
          resolve();
        },
        error: (err) => reject(err)
      });
    });
  }

 logout() {
  localStorage.removeItem("token");

  this._token.set(null);
  this._user.set(null);
}

get token(): string | null {
  return this._token();
}


}
