import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Issue } from '../interfaces/issue';
import { Observable } from 'rxjs';
import { NewIssue } from '../interfaces/newissue';
import { CloseIssue } from '../interfaces/closeissue';
import { IssueData } from '../model/issuedata';

@Injectable()
export class IssueService {
  configUrl: string = 'http://localhost:8080/api/v1/issue';

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

  getIssues(page?: number, size?: number): Observable<IssueData> {
    let url = this.configUrl;
    url += this.urlParamBuilder(true, page, size);
    return this.http.get<IssueData>(url);
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

  //filtering methods

  filterByPriority(
    priority: string,
    page?: number,
    size?: number
  ): Observable<IssueData> {
    let url = `${this.configUrl}?priority=${priority.toUpperCase()}`;
    url += this.urlParamBuilder(false, page, size);
    return this.http.get<IssueData>(url);
  }

  filterByStatus(
    status: string,
    page?: number,
    size?: number
  ): Observable<IssueData> {
    let url = `${this.configUrl}?status=${status.toUpperCase()}`;
    url += this.urlParamBuilder(false, page, size);
    return this.http.get<IssueData>(url);
  }

  filterByStatusAndPriority(
    status: string,
    priority: string,
    page?: number,
    size?: number
  ): Observable<IssueData> {
    let url = `${
      this.configUrl
    }/filter?status=${status.toUpperCase()}&priority=${priority.toUpperCase()}`;
    url += this.urlParamBuilder(false, page, size);
    return this.http.get<IssueData>(url);
  }
}
