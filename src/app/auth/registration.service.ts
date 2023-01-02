import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Newuser } from '../interfaces/newuser';

@Injectable()
export class RegistrationService {
  configUrl: string = 'http://localhost:8080/api/v1/registration';

  constructor(private http: HttpClient) {}

  registerUser(user: Newuser): Observable<any> {
    const body = JSON.stringify(user);
    const headers = { 'content-type': 'application/json' };
    return this.http.post(this.configUrl, body, { headers: headers });
  }
}
