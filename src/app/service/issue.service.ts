import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Issue } from '../interfaces/issue';
import { Observable } from 'rxjs';
import { NewIssue } from '../interfaces/newissue';

@Injectable()
export class IssueService {
  configUrl: string = 'http://localhost:8080/api/v1/issue';

  constructor(private http: HttpClient) {}

  getIssues(): Observable<Issue[]> {
    return this.http.get<Issue[]>(this.configUrl);
  }

  newIssue(newIssue: NewIssue): Observable<any> {
    const body = JSON.stringify(newIssue);
    const headers = { 'content-type': 'application/json' };
    return this.http.post(this.configUrl, body, { headers: headers });
  }
}
