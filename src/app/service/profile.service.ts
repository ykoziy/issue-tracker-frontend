import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../interfaces/user';
import { UserData } from '../model/userdata';
import { HttpUtils } from '../shared/util/http-utils';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  configUrl: string = 'http://localhost:8080/api/v1/profiles';

  constructor(private http: HttpClient) {}

  getProfile(userId: number): Observable<User> {
    const url = `${this.configUrl}/${userId}`;
    return this.http.get<User>(url);
  }

  updateProfile(userDetails: User, userId: number): Observable<any> {
    const body = JSON.stringify(userDetails);
    const headers = { 'content-type': 'application/json' };
    const url = `${this.configUrl}/${userId}`;
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
    let filterParams = { ...queryParams, page: page, size: size };
    let params: HttpParams = HttpUtils.buildHttpParams(filterParams);
    return this.http.get<UserData>(url, { params });
  }
}
