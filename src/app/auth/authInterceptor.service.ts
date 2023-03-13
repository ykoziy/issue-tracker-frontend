import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { LoginService } from './login.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private loginService: LoginService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (
      this.loginService.isAuthenticated() &&
      req.url.indexOf('authenticate') === -1
    ) {
      req = req.clone({
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.loginService.getToken()}`,
        }),
      });
    }
    return next.handle(req).pipe(
      tap({
        error: (err) => {
          if (req.url.indexOf('authenticate') !== -1) {
            this.errorHandling(err);
          }
        },
      })
    );
  }

  private errorHandling(error: any): void {
    if (error.status === 401 || error.status === 403) {
      if (this.loginService.isAuthenticated()) {
        this.loginService.logout();
      }
    }
  }
}
