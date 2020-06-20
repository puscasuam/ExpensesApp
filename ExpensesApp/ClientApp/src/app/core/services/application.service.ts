import { Injectable } from '@angular/core';
import { TokenService } from './token.service';

@Injectable()
export class ApplicationService {

  public baseUrl: string;

  constructor(private tokenService: TokenService) {
    this.baseUrl = document.getElementsByTagName('base')[0].href;
  }

  isLoggedIn() {
    return this.tokenService.getToken() != null;
  }

  userEmail() {
    var token = this.tokenService.getToken();

    if (token != null)
      return token.email;

    return "";
  }
}
