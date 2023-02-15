import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
      const authReq = req.clone({
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.loginService.getToken()}`,
        }),
      });
      return next.handle(authReq);
    }
    return next.handle(req);
  }
}
