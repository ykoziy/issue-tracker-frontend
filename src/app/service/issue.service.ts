import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Issue } from '../interfaces/issue';
import { Observable, of } from 'rxjs';
import { NewIssue } from '../interfaces/newissue';
import { CloseIssue } from '../interfaces/closeissue';
import { IssueData } from '../model/issuedata';

@Injectable()
export class IssueService {
  configUrl: string = 'http://localhost:8080/api/v1/issues';

  constructor(private http: HttpClient) {}

  getIssues(
    queryParams: any,
    page?: number,
    size?: number
  ): Observable<IssueData> {
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

  closeIssue(issueId: number, resolutionMessage: string): Observable<any> {
    const body = resolutionMessage;
    const url = `${this.configUrl}/${issueId}/close`;
    const headers = { 'content-type': 'application/json' };
    return this.http.put(url, body, { headers: headers });
  }

  editIssue(issue: Issue): Observable<any> {
    const body = JSON.stringify(issue);
    const headers = { 'content-type': 'application/json' };
    const url = `${this.configUrl}`;
    return this.http.put(url, body, { headers: headers });
  }

  deleteIssue(issueId: number): Observable<any> {
    const url = `${this.configUrl}/${issueId}`;
    return this.http.delete(url);
  }
}
