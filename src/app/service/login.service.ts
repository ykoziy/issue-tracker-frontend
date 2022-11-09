import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class LoginService {
  authenticated = false;

  constructor(private http: HttpClient) {}

  authenticate(
    credentials: { username: string; password: string },
    callback: { (): void; (): any }
  ) {
    const headers = new HttpHeaders(
      credentials
        ? {
            authorization:
              'Basic ' +
              btoa(credentials.username + ':' + credentials.password),
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
}
