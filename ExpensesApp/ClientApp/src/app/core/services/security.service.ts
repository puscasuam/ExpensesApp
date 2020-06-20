import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observer, Observable } from 'rxjs';

import { Token, RegisterModel, LoginModel } from './security.models';
import { TokenService } from './token.service';
import { ApplicationService } from './application.service';

@Injectable()
export class SecurityService {

  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService,
    private applicationService: ApplicationService) {
  }

  register(registerModel: RegisterModel) {
    return new Observable<Token>((obs: Observer<Token>) => {
      this.httpClient.post<Token>(`${this.applicationService.baseUrl}Account/Register`, registerModel).subscribe(token => {

        this.tokenService.saveToken(token);

        obs.next(token);
        obs.complete();
      });
    });
  }

  login(loginModel: LoginModel) {
    return new Observable<Token>((obs: Observer<Token>) => {
      this.httpClient.post<Token>(`${this.applicationService.baseUrl}Account/Login`, loginModel).subscribe(token => {

        this.tokenService.saveToken(token);

        obs.next(token);
        obs.complete();
      });
    });
  }

  logout() {
    this.tokenService.deleteToken();
  }
}
