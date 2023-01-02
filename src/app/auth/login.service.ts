import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class LoginService {
  private authenticated: boolean = false;

  constructor(private http: HttpClient) {}

  authenticate(
    credentials: { username: string; password: string },
    callback: { (): void; (): any }
  ) {
    const token = window.btoa(
      credentials.username + ':' + credentials.password
    );

    sessionStorage.setItem('authToken', token);

    const headers = new HttpHeaders(
      credentials
        ? {
            authorization: 'Basic ' + token,
          }
        : {}
    );

    this.http
      .get('http://localhost:8080/api/v1/basicauth', {
        headers: headers,
        responseType: 'text',
      })
      .subscribe(
        (response) => {
          if (response === 'you are logged in') {
            this.authenticated = true;
          } else {
            this.authenticated = false;
          }
          return callback && callback();
        },
        (error) => {
          if (error.status === 401) {
            this.authenticated = false;
            return callback && callback();
          }
        }
      );
  }

  isAuthenticated(): boolean {
    return sessionStorage.getItem('authToken') !== null;
  }

  logout(): void {
    this.authenticated = false;
    sessionStorage.removeItem('authToken');
  }

  getToken(): string {
    const token = sessionStorage.getItem('authToken');
    return token === null ? '' : token;
  }
}
