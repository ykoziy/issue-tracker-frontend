import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Issue } from '../interfaces/issue';
import { Observable, of } from 'rxjs';
import { NewIssue } from '../interfaces/newissue';
import { CloseIssue } from '../interfaces/closeissue';
import { IssueData } from '../model/issuedata';

@Injectable()
export class IssueService {
  configUrl: string = 'http://localhost:8080/api/v1/issue';

  constructor(private http: HttpClient) {}

  getIssues(page?: number, size?: number): Observable<IssueData> {
    let url = this.configUrl;
    let params = new HttpParams();
    let filterParams: any = { page: page, size: size };

    for (const key in filterParams) {
      if (filterParams.hasOwnProperty(key)) {
        if (filterParams[key] !== '' && filterParams[key] !== undefined) {
          params = params.set(key, filterParams[key]);
        }
      }
    }
    return this.http.get<IssueData>(url, { params });
  }

  getIssue(issueId: number): Observable<Issue> {
    const url = `${this.configUrl}/${issueId}`;
    return this.http.get<Issue>(url);
  }

  newIssue(newIssue: NewIssue): Observable<any> {
    const body = JSON.stringify(newIssue);
    const headers = { 'content-type': 'application/json' };
    return this.http.post(this.configUrl, body, { headers: headers });
  }

  closeIssue(closeIssue: CloseIssue): Observable<any> {
    const body = JSON.stringify(closeIssue);
    const url = `${this.configUrl}/close`;
    const headers = { 'content-type': 'application/json' };
    return this.http.post(url, body, { headers: headers });
  }

  editIssue(userId: number, issue: Issue): Observable<any> {
    const body = JSON.stringify(issue);
    const headers = { 'content-type': 'application/json' };
    const url = `${this.configUrl}/edit?userId=${userId}`;
    return this.http.post(url, body, { headers: headers });
  }

  deleteIssue(userId: number, issueId: number): Observable<any> {
    const url = `${this.configUrl}?userId=${userId}&issueId=${issueId}`;
    return this.http.delete(url);
  }

  filterIssues(
    queryParams: any,
    page?: number,
    size?: number
  ): Observable<IssueData> {
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
    return this.http.get<IssueData>(url, { params });
  }
}
