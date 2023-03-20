import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
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

  unlockUser(userDetails: User) {
    const body = JSON.stringify(userDetails);
    const headers = { 'content-type': 'application/json' };
    const url = `${this.configUrl}/unlock`;
    return this.http.post(url, body, { headers: headers });
  }

  filterUsers(
    queryParams: any,
    page?: number,
    size?: number
  ): Observable<UserData> {
    let url = `${this.configUrl}/filter`;
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
