import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Issue } from '../interfaces/issue';
import { Observable } from 'rxjs';
import { NewIssue } from '../interfaces/newissue';
import { CloseIssue } from '../interfaces/closeissue';

@Injectable()
export class IssueService {
  configUrl: string = 'http://localhost:8080/api/v1/issue';

  constructor(private http: HttpClient) {}

  getIssues(): Observable<Issue[]> {
    return this.http.get<Issue[]>(this.configUrl);
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
}
