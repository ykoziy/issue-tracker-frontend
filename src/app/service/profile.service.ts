import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { UserData } from '../model/userdata';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  configUrl: string = 'http://localhost:8080/api/v1/profile';

  constructor(private http: HttpClient) {}

  private urlParamBuilder(isNew: boolean, page?: number, size?: number) {
    let params: string = '';
    if (isNew === true) {
      params += '?';
    } else {
      params += '&';
    }

    if (page && size) {
      params += `page=${page}&size=${size}`;
    } else if (page) {
      params += `page=${page}`;
    } else if (size) {
      params += `size=${size}`;
    }
    return params;
  }

  getProfile(userId: number): Observable<User> {
    const url = `${this.configUrl}?id=${userId}`;
    return this.http.get<User>(url);
  }

  updateProfile(userDetails: User, userId: number): Observable<any> {
    const body = JSON.stringify(userDetails);
    const headers = { 'content-type': 'application/json' };
    const url = `${this.configUrl}?id=${userId}`;
    return this.http.post(url, body, { headers: headers });
  }

  getUsers(page?: number, size?: number): Observable<UserData> {
    let url = `${this.configUrl}/users`;
    url += this.urlParamBuilder(true, page, size);
    return this.http.get<UserData>(url);
  }

  banUser(userDetails: User) {
    const body = JSON.stringify(userDetails);
    const headers = { 'content-type': 'application/json' };
    const url = `${this.configUrl}/ban`;
    return this.http.post(url, body, { headers: headers });
  }
}
