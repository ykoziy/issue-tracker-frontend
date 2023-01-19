import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  configUrl: string = 'http://localhost:8080/api/v1/profile';

  constructor(private http: HttpClient) {}

  getProfile(userId: number): Observable<User> {
    const url = `${this.configUrl}?id=${userId}`;
    return this.http.get<User>(url);
  }

  updateProfile(userDetails: User): Observable<any> {
    const body = JSON.stringify(userDetails);
    const headers = { 'content-type': 'application/json' };
    return this.http.post(this.configUrl, body, { headers: headers });
  }

  getUsers(): Observable<User[]> {
    const url = `${this.configUrl}/users`;
    return this.http.get<User[]>(url);
  }

  banUser(userDetails: User) {
    const body = JSON.stringify(userDetails);
    const headers = { 'content-type': 'application/json' };
    const url = `${this.configUrl}/ban`;
    return this.http.post(url, body, { headers: headers });
  }
}
