import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserDetails } from '../model/userdetails';

@Injectable()
export class LoginService {
  private authenticated: boolean = false;
  private userDetails: UserDetails = <UserDetails>{};

  constructor(private http: HttpClient) {}

  authenticate(
    credentials: { username: string; password: string },
    callback: { (): void; (): any }
  ) {
    const token = window.btoa(
      credentials.username + ':' + credentials.password
    );

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
        responseType: 'json',
      })
      .subscribe(
        (response) => {
          if (response.hasOwnProperty('id')) {
            this.userDetails = <UserDetails>response;
            this.userDetails.authToken = token;
            sessionStorage.setItem(
              'userDetails',
              JSON.stringify(this.userDetails)
            );
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
    return sessionStorage.getItem('userDetails') !== null;
  }

  logout(): void {
    this.authenticated = false;
    sessionStorage.removeItem('userDetails');
  }

  getToken(): string {
    const userDetails = <UserDetails>(
      JSON.parse(sessionStorage.getItem('userDetails') || '{}')
    );
    if (userDetails.authToken !== undefined) {
      return userDetails.authToken;
    } else {
      return '';
    }
  }
}
