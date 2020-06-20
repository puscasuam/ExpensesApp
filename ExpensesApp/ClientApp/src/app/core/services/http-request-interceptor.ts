import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpRequest, HttpErrorResponse, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { empty, Observable, throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TokenService } from './token.service';
import { Token } from './security.models';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private tokenService: TokenService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    var token: Token = this.tokenService.getToken();

    request = token ? request.clone(
      {
        headers: request.headers.set("Authorization", "Bearer " + token.value)
      }
    ) : request;

    return next.handle(request).pipe(
      catchError(
        (error: HttpErrorResponse, caught: Observable<HttpEvent<HttpErrorResponse>>) => {

          if (error.status === 401) {
            this.router.navigate(['/login']);
            return of<HttpEvent<HttpErrorResponse>>();
          }

          if (error.status === 403) {
            this.router.navigate(['/forbidden']);
            return of<HttpEvent<HttpErrorResponse>>();
          }
          return throwError(error);
        }
      )
    );
  }
}
