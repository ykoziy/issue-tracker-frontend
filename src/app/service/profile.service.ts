import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../interfaces/user';
import { UserData } from '../model/userdata';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  configUrl: string = 'http://localhost:8080/api/v1/profiles';

  constructor(private http: HttpClient) {}

  getProfile(userId: number): Observable<User> {
    const url = `${this.configUrl}?id=${userId}`;
    return this.http.get<User>(url);
  }

  updateProfile(userDetails: User, userId: number): Observable<any> {
    const body = JSON.stringify(userDetails);
    const headers = { 'content-type': 'application/json' };
    const url = `${this.configUrl}?id=${userId}`;
    return this.http.put(url, body, { headers: headers });
  }

  banUser(userDetails: User) {
    const body = JSON.stringify(userDetails);
    const headers = { 'content-type': 'application/json' };
    const url = `${this.configUrl}/ban`;
    return this.http.put(url, body, { headers: headers });
  }

  unlockUser(userDetails: User) {
    const body = JSON.stringify(userDetails);
    const headers = { 'content-type': 'application/json' };
    const url = `${this.configUrl}/unlock`;
    return this.http.put(url, body, { headers: headers });
  }

  getUsers(
    queryParams: any,
    page?: number,
    size?: number
  ): Observable<UserData> {
    let url = `${this.configUrl}`;
    let params = new HttpParams();

    let filterParams = { ...queryParams, page: page, size: size };

    for (const key in filterParams) {
      if (filterParams.hasOwnProperty(key)) {
        if (filterParams[key] !== '' && filterParams[key] !== undefined) {
          params = params.set(key, filterParams[key]);
        }
      }
    }
    return this.http.get<UserData>(url, { params });
  }
}
