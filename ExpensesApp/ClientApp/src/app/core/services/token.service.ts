import { Injectable } from '@angular/core';
import { Token } from './security.models';

@Injectable()
export class TokenService {

  constructor() { }

  saveToken(token: Token) {
    localStorage.setItem("token", JSON.stringify(token));
  }

  getToken(): Token | null {
    return this.validate(JSON.parse(localStorage.getItem("token") as string));
  }

  validate(token: Token | null): Token | null {
    if (token) {
      if (new Date(token.expiry) > new Date())
        return token;
    }

    return null;
  }

  deleteToken() {
    localStorage.removeItem("token");
  }
}
