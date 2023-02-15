import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserDetails } from '../model/userdetails';
import { JwtPayload } from '../model/jwtpayload';

export interface Response {
  token: string;
}

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

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = {
      username: credentials.username,
      password: credentials.password,
    };

    this.http
      .post<Response>('http://localhost:8080/api/v1/auth/authenticate', body, {
        headers: headers,
        responseType: 'json',
      })
      .subscribe({
        next: (response) => {
          if (response.hasOwnProperty('token')) {
            this.userDetails = this.extractData(response);
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
        error: (error) => {
          if (error.status === 401) {
            this.authenticated = false;
            return callback && callback();
          }
        },
      });
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

  extractData(response: Response): UserDetails {
    const token = response.token.split('.');
    const payload: JwtPayload = JSON.parse(window.atob(token[1]));
    const details: UserDetails = new UserDetails(
      +payload.id,
      payload.role,
      response.token
    );
    return details;
  }

  getUserId(): number {
    const userDetails = <UserDetails>(
      JSON.parse(sessionStorage.getItem('userDetails') || '{}')
    );
    if (userDetails.authToken !== undefined) {
      return userDetails.id;
    } else {
      return 0;
    }
  }

  getUserRole(): string {
    const userDetails = <UserDetails>(
      JSON.parse(sessionStorage.getItem('userDetails') || '{}')
    );
    if (userDetails.authToken !== undefined) {
      return userDetails.userRole;
    } else {
      return '';
    }
  }
}
