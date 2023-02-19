import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { NewUser } from '../interfaces/newuser';

@Injectable()
export class RegistrationService {
  configUrl: string = 'http://localhost:8080/api/v1/auth/register';

  constructor(private http: HttpClient) {}

  registerUser(user: NewUser): Observable<any> {
    const body = JSON.stringify(user);
    const headers = { 'content-type': 'application/json' };
    return this.http.post(this.configUrl, body, { headers: headers });
  }
}
