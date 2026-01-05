import { Injectable, inject, Injector, signal } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { BackendService } from '../rest-backend/backend-service';

type TokenPayload = {
  user: string;
  exp?: number;
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private rest = inject(BackendService);

  private _token = signal<string | null>(localStorage.getItem("token"));
  private _user = signal<{ id: number; userName: string } | null>(null);


  constructor() {
    // Se esiste token, inizializza user
    const token = this._token();
    if (token) {
      this._setUserFromToken(token);
    }
  }

  private _setUserFromToken(token: string) {
  try {
    const decoded: any = jwtDecode(token);
    this._user.set({
      id: decoded.id,
      userName: decoded.userName
    });
  } catch (err) {
    this._user.set(null);
  }
}


  get token() {
    return this._token();
  }

  get user() {
    return this._user();
  }

  get isLogged(): boolean {
    const token = this._token();
    if (!token) return false;
    try {
      const decoded: any = jwtDecode(token) as TokenPayload;
      return decoded.exp !== undefined && Date.now() < decoded.exp * 1000;
    } catch {
      return false;
    }
  }

  login(credentials: { email: string, password: string }): Promise<void> {
    return new Promise((resolve, reject) => {
      this.rest.login(credentials).subscribe({
        next: (response) => {
          localStorage.setItem("token", response.token);
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
}
