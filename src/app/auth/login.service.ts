import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserDetails } from '../model/userdetails';
import { JwtPayload } from '../model/jwtpayload';
import { delay, map, Observable, of, Subscription } from 'rxjs';
import { Router } from '@angular/router';

export interface Response {
  token: string;
}

@Injectable()
export class LoginService {
  private authenticated: boolean = false;
  private userDetails: UserDetails = <UserDetails>{};
  private tokenSubscription = new Subscription();
  private timeout: number = 0;

  constructor(private http: HttpClient, private router: Router) {}

  loginWithToken() {}

  authenticate(credentials: {
    username: string;
    password: string;
  }): Observable<boolean> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let result: boolean;
    const body = {
      username: credentials.username,
      password: credentials.password,
    };

    return this.http
      .post<Response>('http://localhost:8080/api/v1/auth/authenticate', body, {
        headers: headers,
        responseType: 'json',
      })
      .pipe(
        map((response) => {
          if (response.hasOwnProperty('token')) {
            this.userDetails = this.extractUserDetails(response);
            this.timeout =
              this.getTokenExpiration(response) * 1000 - new Date().valueOf();
            sessionStorage.setItem(
              'userDetails',
              JSON.stringify(this.userDetails)
            );
            this.expirationCounter(this.timeout);
            this.authenticated = true;
            result = true;
          } else {
            this.authenticated = false;
            result = false;
          }
        }),
        map(() => result)
      );
  }

  isAuthenticated(): boolean {
    return sessionStorage.getItem('userDetails') !== null;
  }

  logout(): void {
    this.authenticated = false;
    this.tokenSubscription.unsubscribe();
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

  extractUserDetails(response: Response): UserDetails {
    const token = response.token.split('.');
    const payload: JwtPayload = JSON.parse(window.atob(token[1]));
    const details: UserDetails = new UserDetails(
      +payload.id,
      payload.role,
      response.token
    );
    return details;
  }

  getTokenExpiration(response: Response): number {
    const token = response.token.split('.');
    const payload: JwtPayload = JSON.parse(window.atob(token[1]));
    return payload.exp;
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

  expirationCounter(timeout: number) {
    this.tokenSubscription.unsubscribe();
    this.tokenSubscription = of(null)
      .pipe(delay(timeout))
      .subscribe(() => {
        console.log('token expired');
        this.logout();
        this.router.navigate(['/login']);
      });
  }
}
